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
            this.config = Object.assign({}, config);
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
                            if(config.horari[week_day][periode][0][0] !== '' && config.horari[week_day][periode][0][1] !== '' && config.horari[week_day][periode][1][0] !== '' && config.horari[week_day][periode][1][1] !== '')
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
        let titol = '';
        let descripcio = '';
        let titollink = '';
        let link = '';
        let className = '';
        switch(msg_code)
        {
            case 'inici_feina':
                titol = "D'aquí cinc minuts comença la feina, ja estàs preparat?";
                descripcio = "És important que comencem la feina amb plena energia. Hem d'haver esmorzat, hem de tenir una bona higiene personal i cal que ens vestim perquè el nostre cap entengui que estem treballant. S'ha de disposar d'un bon ambient per poder-se concentrar. Procura tenir bona il·luminació i una bona postura per evitar possibles mals d'esquena.";
                className = 'warn';
                break;
            case 'mini-parada':
                titol = "Què et sembla si parem 5 minuts?";
                descripcio = "Els teus ulls porten una bona estona mirant la pantalla. És recomanable que estiris les cames i miris per la finestra per aconseguir que els ulls enfoquin a diferents distàncies i es relaxin.";
                titollink = "Petites relaxacions";
                link = "https://www.youtube.com/watch?v=gL20MtA_89s";
                className = 'info';
                break;
            case 'parada':
                titol = "Què et sembla si parem 10 minuts?";
                descripcio = "Aixeca't, pren un got d'aigua, fes una mica d'estiraments. Fent 10 minuts de Tai Chi mouràs tots els músculs del teu cos, ho agrairàs tant fisicament com mentalment i serà mes fàcil concentrar-te.";
                titollink = "";
                link = "https://www.youtube.com/watch?v=cEOS2zoyQw4";
                className = 'info';
                break;
            case 'fi_feina':
                titol = "Ja és hora d'acabar la feina";
                descripcio = "És una bona pràctica apuntar-te on has acabat perquè demà et sigui més fàcil continuar. Per molta feina que tinguis, no l'acabaràs avui. No et passis fent més hores del compte perquè el teu cos se'n resentirà";
                className = 'success';
                break;
            case 'esport':
                titol = "És hora de fer exercici, mou-te!";
                descripcio = "Cada dia hem de fer una mica d'exercici i, quan s'està fent teletreball, és molt habitual deixar-se en aquest aspecte.<br/>No calen grans aparells per exercitar i estirar els músculs. Tingues inventiva i veuràs com et poden ajudar un parell de garrafes d'aigua 😉";
                titollink = "Exercici";
                link = "https://www.youtube.com/watch?v=iS1ClEUZJ20";
                className = 'base';
                break;
            case 'social':
                titol = "Què et sembla si fem una trucada?";
                descripcio = "La teva família i amics volen saber com estàs. Fes-los una trucada! Aixi desconnectes de la feina i disfrutaràs mes del teu temps d'oci";
                className = 'base';
                break;
        }

        let message = $('<div/>');
        message.append(
            $('<b/>').html(titol)
        ).append(
            $('<br/>')
        ).append(descripcio);
        if(link)
        {
            if(!titollink) titollink = link;
            message.append(
                $('<br/>')
            ).append(
                $('<a/>').attr('href', link).html(titollink)
            );
        }

        notification(message, className);
    }
}