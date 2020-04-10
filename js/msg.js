class msg {
    config = {
        defined: false,
        horari: [],
        dataNaixement: null
    };

    setConfig(config)
    {
        if(config.defined)
        {
            this.config = config;
            if(config.horari.length)
            {
                config.horari.forEach(function(i, dia){
                    if(typeof config.horari[dia] !== 'undefined' && config.horari[dia].length)
                    {
                        config.horari[dia].forEach(function(j, periode){
                            if(config.horari[dia][periode].length === 2)
                            {
                                config.horari[dia][periode][0] = config.horari[dia][periode][0].split(':');
                                config.horari[dia][periode][1] = config.horari[dia][periode][1].split(':');
                            }
                        });
                    }
                });
            }
        }
    }
    hasConfig()
    {
        return this.config.defined;
    }
    check()
    {
        if(this.hasConfig())
        {
            let Messenger = this;
            let config = this.config;
            if(config.horari.length)
            {
                let datetime = moment().startOf('minute');
                let week_day = datetime.weekday();

                if(typeof config.horari[week_day] !== 'undefined' && config.horari[week_day].length)
                {
                    // --- Laborable --
                    config.horari[week_day].forEach(function(j, periode){
                        if(config.horari[week_day][periode].length === 2)
                        {
                            let inici = moment().hour(config.horari[week_day][periode][0][0]).minute(config.horari[week_day][periode][0][1]).startOf('minute');
                            let fi =    moment().hour(config.horari[week_day][periode][1][0]).minute(config.horari[week_day][periode][1][1]).startOf('minute');

                            let avis_inici = inici.clone().subtract(5, 'minutes');
                            if(datetime.isSame(avis_inici))
                            {
                                // Inici de feina
                                Messenger.message('inici_feina');
                            }
                            else if(datetime.isAfter(inici) && datetime.isBefore(fi))
                            {
                                if(datetime.minutes() === inici.minutes())
                                {
                                    if((datetime.hour() - inici.hour()) % 2 === 1)
                                    {
                                        // Mini-Parada
                                        Messenger.message('mini-parada');
                                    }
                                    else
                                    {
                                        // Parada
                                        Messenger.message('parada');
                                    }
                                }
                            }
                            else if(datetime.isSame(fi))
                            {
                                // Fi de feina
                                Messenger.message('fi_feina');
                            }
                        }
                    });

                    // Fi del dia = fi d'ultim periode del dia;
                    let periode = config.horari[week_day].length -1;
                    let end_time = moment().hour(config.horari[week_day][periode][1][0]).minute(config.horari[week_day][periode][1][1]).startOf('minute');

                    if(datetime.isAfter(end_time))
                    {
                        let esport = end_time.clone().add(5, 'minutes');
                        let social = end_time.clone().add(1, 'hour');
                        if(datetime.isSame(esport))
                        {
                            // Practica esport
                            Messenger.message('esport');
                        }
                        else if(datetime.isSame(social))
                        {
                            // Socialitza't
                            Messenger.message('social');
                        }
                    }
                }
                else
                {
                    // --- No Laborable --
                    if(week_day !== 5 && week_day !== 6)
                    {
                        // Entre setmana
                        let end_time = moment().hour(18).minute(0).startOf('minute');
                    }
                    else
                    {
                        // Cap de setmana (per ara igual)
                        let end_time = moment().hour(18).minute(0).startOf('minute');
                    }

                    if(datetime.isAfter(end_time))
                    {
                        let esport = end_time.clone().add(5, 'minutes');
                        let social = end_time.clone().add(1, 'hour');
                        if(datetime.isSame(esport))
                        {
                            // Practica esport
                            Messenger.message('esport');
                        }
                        else if(datetime.isSame(social))
                        {
                            // Socialitza't
                            Messenger.message('social');
                        }
                    }
                }
            }
        }
    }
    message(msg_code)
    {
        // msg_code [inici_feina, mini-parada, parada, fi_feina, esport, social]
        // className [base, error, success, info, warn]
        // TODO formatejar missatge i mostrar
        let message = '';
        let className = '';
        switch(msg_code)
        {
            case 'inici_feina':
                message = msg_code;
                className = 'warn';
                break;
            case 'mini-parada':
                message = msg_code;
                className = 'info';
                break;
            case 'parada':
                message = msg_code;
                className = 'info';
                break;
            case 'fi_feina':
                message = msg_code;
                className = 'success';
                break;
            case 'esport':
                message = msg_code;
                className = 'base';
                break;
            case 'social':
                message = msg_code;
                className = 'base';
                break;
        }

        notification(message, className);
    }
}