class bd {
    horari = null;
    dataNaixement = null;
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
        }
        return true;
    }
    carrega()
    {
        if (this.teConfiguracio())
        {
            let horariStr = localStorage.getItem('horari');
            if (this.util.IsJsonString(horariStr))
            {
                this.horari = JSON.parse(horariStr);
            }
            this.dataNaixement = localStorage.getItem('dataNaixement');
        }
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