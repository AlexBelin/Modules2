function CountDownElement(ElemValue, ElemLegend, CountdownSys){
    this.ElemValue = ElemValue;
    this.ElemLegend = ElemLegend;
    this.CountdownSys = CountdownSys;

    this.MakeElement = function(){
        this.Cell = document.createElement('div');
        this.Cell.classList.add('countdown-cell');
        this.Value = document.createElement('div');
        this.Legend = document.createElement('div');
        this.Legend.classList.add('cell-legend');
        this.Legend.innerHTML = this.ElemLegend;
        this.Cell.appendChild(this.Value);
        this.Cell.appendChild(this.Legend);
    };

    this.UpdateElement = function(_Value){
        this.ElemValue = _Value;
        if(this.ElemValue < 10){
            if((Number(this.ElemValue) == 0) && (this.CountdownSys.ElemsList[0] === this)){
                this.Cell.remove();
                this.CountdownSys.ElemsList.splice(0, 1);
            }
            else{
                this.ElemValue = '0' + this.ElemValue;
            }
        }
        this.Value.innerHTML = this.ElemValue;
    };
}

function CountdownSys(ElemID, EndTime, TitleText, EndEventText){
    this.ElemID = ElemID;
    this.CountdownContainer = document.getElementById(this.ElemID);
    this.EndTime = EndTime;
    this.TitleText = TitleText;
    this.EndEventText = EndEventText;
    this.ElemsList = [];

    this.ActivateCountdown = function(){
        this.MakeElements();
        this.IsolateTimeElems();
        this.GetMonth();
        this.GetDuration();
    };

    this.MakeElements = function(){
        this.CountdownContainer.classList.add('countdown-sys');
        this.Title = document.createElement('div');
        this.Title.classList.add('title');
        this.Title.appendChild(document.createTextNode(this.TitleText));
        this.EndEvent = document.createElement('div');
        this.EndEvent.classList.add('countdown-end-text');
        this.EndEvent.appendChild(document.createTextNode(this.EndEventText));

        this.ContentInfos = document.createElement('div');
        this.ContentInfos.classList.add('countdown-infos');

        this.RowCells = document.createElement('div');
        this.RowCells.classList.add('row-cells');
        this.Days = new CountDownElement(0, 'jours', this);
        this.Days.MakeElement();
        this.ElemsList.push(this.Days);
        this.Hours = new CountDownElement(0, 'heures', this);
        this.Hours.MakeElement();
        this.ElemsList.push(this.Hours);
        this.Minutes = new CountDownElement(0, 'minutes', this);
        this.Minutes.MakeElement();
        this.ElemsList.push(this.Minutes);
        this.Seconds = new CountDownElement(0, 'secondes', this);
        this.Seconds.MakeElement();
        this.ElemsList.push(this.Seconds);

        this.RowCells.appendChild(this.Days.Cell);
        this.RowCells.appendChild(this.Hours.Cell);
        this.RowCells.appendChild(this.Minutes.Cell);
        this.RowCells.appendChild(this.Seconds.Cell);
        
        this.CountdownContainer.appendChild(this.Title);
        this.ContentInfos.appendChild(this.RowCells);
        this.ContentInfos.appendChild(this.EndEvent);
        this.CountdownContainer.appendChild(this.ContentInfos);
    };

    this.GetDuration = function(){
        var _DeadLine = new Date(this.EndMonth + ' ' + this.EndDay + ', ' + this.EndYear + ' ' + this.EndTime).getTime();
        var _this = this;
        var _CountDown = setInterval(function(){
            var _Now = new Date().getTime();
            var _Difference = _DeadLine - _Now;
            var _days = Math.floor(_Difference / (1000 * 60 * 60 * 24));
            var _hours = Math.floor((_Difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var _minutes = Math.floor((_Difference % (1000 * 60 * 60)) / (1000 * 60));
            var _seconds = Math.floor((_Difference % (1000 * 60)) / 1000);
            _this.Days.UpdateElement(_days);
            _this.Hours.UpdateElement(_hours);
            _this.Minutes.UpdateElement(_minutes);
            _this.Seconds.UpdateElement(_seconds);
            if((_days <= 0) && (_hours <= 0) && (_minutes <= 0) && (_seconds < 1)){
                clearInterval(_CountDown);
                //_this.EndEvent.classList.add('revealed');
                //_this.RowCells.classList.add('hidden');
                _this.RowCells.style.top = '-' + _this.CountdownContainer.getBoundingClientRect().height + 'px';
                _this.EndEvent.style.top = (_this.ContentInfos.getBoundingClientRect().height / 2) - (_this.EndEvent.getBoundingClientRect().height / 2) + 'px';
            }
        }, 1000);
    };

    this.GetMonth = function(){
        var _Months = [
            {'month': 'January', 'monthNum': '01'},
            {'month': 'February', 'monthNum': '02'},
            {'month': 'March', 'monthNum': '03'},
            {'month': 'April', 'monthNum': '04'},
            {'month': 'May', 'monthNum': '05'},
            {'month': 'June', 'monthNum': '06'},
            {'month': 'July', 'monthNum': '07'},
            {'month': 'August', 'monthNum': '08'},
            {'month': 'September', 'monthNum': '09'},
            {'month': 'October', 'monthNum': '10'},
            {'month': 'November', 'monthNum': '11'},
            {'month': 'December', 'monthNum': '12'}
        ];
        var _Index = 0;
        while(this.EndMonth != _Months[_Index].monthNum){
            _Index++;
        }
        this.EndMonth = _Months[_Index].month;
    };

    this.IsolateTimeElems = function(){
        var _TempEndTime = this.EndTime.split(' ');
        _TempEndTime[0] = _TempEndTime[0].split('/');
        this.EndDay = _TempEndTime[0][0];
        this.EndMonth = _TempEndTime[0][1];
        this.EndYear = _TempEndTime[0][2];
        this.EndTime = _TempEndTime[1]
    };
}