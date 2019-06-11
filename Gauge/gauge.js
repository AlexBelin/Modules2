function GaugeElem(ElemLabel, GaugeSys){
    this.ElemLabel = ElemLabel;
    this.GaugeSys = GaugeSys;

    this.GiveEventListener = function(){
        this.LabelDOM = document.createElement('div');
        this.LabelDOM.classList.add('label-cell');
        this.LabelDOM.style.width= 100 / this.GaugeSys.Values.length + '%';
        this.LabelDOM.appendChild(document.createTextNode(this.ElemLabel));
        this.LabelDOM.addEventListener('click', this.MoveCursor.bind(this));
        this.GaugeSys.GaugeContainer.appendChild(this.LabelDOM);
    };

    this.MoveCursor = function(){
        var _XDisplacement = this.LabelDOM.getBoundingClientRect().left + (this.LabelDOM.getBoundingClientRect().width / 2) - this.GaugeSys.Gauge.getBoundingClientRect().left;
        this.GaugeSys.Cursor.style.left = _XDisplacement + 'px';
        this.GaugeSys.Input.value = this.ElemLabel;
    };
}

function GaugeSys(GaugeID, Values, InputID){
    this.GaugeID = GaugeID;
    this.Values = Values;
    this.InputID = InputID;
    this.GaugeContainer = document.getElementById(this.GaugeID);
    this.Input = document.getElementById(this.InputID);
    this.GaugeLabels = [];

    this.ActivateGauge = function(){
        this.MakeLabels();
        this.Input.type = 'hidden';
        this.GaugeContainer.classList.add('vote-sys');
        this.Gauge = document.createElement('div');
        this.Gauge.classList.add('gauge');
        this.Cursor = document.createElement('div');
        this.Cursor.classList.add('cursor');
        this.Gauge.appendChild(this.Cursor);
        this.GaugeContainer.appendChild(this.Gauge);
        this.GaugeContainer.appendChild(this.Input);
    };

    this.MakeLabels = function(){
        var NewElem = null;
        for(var i = 0 ; i < this.Values.length ; i++){
            NewElem = new GaugeElem(this.Values[i], this);
            this.GaugeLabels.push(NewElem);
            NewElem.GiveEventListener();
        }
    };
}