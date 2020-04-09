class bd {
    config = {
        defined: false,
        horari: [],
        dataNaixement: null
    };
    util = null;

    constructor() {
        this.util = new utils();
        this.carrega();
    }
    guarda(json) {
        if (!this.util.isJSON(json))
        {
            return false;
        }
        if (json.horari && json.dataNaixement)
        {
            localStorage.setItem('horari', JSON.stringify(json.horari));
            localStorage.setItem('dataNaixement', json.dataNaixement);
            this.carrega();
        }
        return true;
    }
    carrega()
    {
        if (this.teConfiguracio())
        {
            this.config.defined = true;
            let horariStr = localStorage.getItem('horari');
            if (this.util.IsJsonString(horariStr))
            {
                this.config.horari = JSON.parse(horariStr);
            }
            this.config.dataNaixement = localStorage.getItem('dataNaixement');
        }
        else
        {
            this.config.defined = false;
        }
    }
    getConfig()
    {
        return this.config;
    }
    teConfiguracio() {
        if(!localStorage.getItem('horari') || !localStorage.getItem('dataNaixement')) {
            return false;
        } else {
            return true;
        }
    }
    borraConfiguracio()
    {
        localStorage.removeItem('horari');
        localStorage.removeItem('dataNaixement');
    }
}