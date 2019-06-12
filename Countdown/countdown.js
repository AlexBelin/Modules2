function CountdownSys(ElemID, EndTime, TitleText, EndEventText){
    this.ElemID = ElemID;
    this.CountdownContainer = document.getElementById(this.ElemID);
    this.EndTime = EndTime;
    this.TitleText = TitleText;
    this.EndEventText = EndEventText;

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

        var _ContentInfos = document.createElement('div');
        _ContentInfos.classList.add('countdown-infos');

        this.RowCells = document.createElement('div');
        this.RowCells.classList.add('row-cells');
        this.DaysCell = document.createElement('div');
        this.DaysCell.classList.add('countdown-cell');
        this.HoursCell = document.createElement('div');
        this.HoursCell.classList.add('countdown-cell');
        this.MinutesCell = document.createElement('div');
        this.MinutesCell.classList.add('countdown-cell');
        this.SecsCell = document.createElement('div');
        this.SecsCell.classList.add('countdown-cell');

        this.CountdownContainer.appendChild(this.Title);
        this.RowCells.appendChild(this.DaysCell);
        this.RowCells.appendChild(this.HoursCell);
        this.RowCells.appendChild(this.MinutesCell);
        this.RowCells.appendChild(this.SecsCell);
        _ContentInfos.appendChild(this.RowCells);
        _ContentInfos.appendChild(this.EndEvent);
        this.CountdownContainer.appendChild(_ContentInfos);
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
            _this.DaysCell.innerHTML = _days;
            _this.HoursCell.innerHTML = _hours;
            _this.MinutesCell.innerHTML = _minutes;
            _this.SecsCell.innerHTML = _seconds;
            if((_days <= 0) && (_hours <= 0) && (_minutes <= 0) && (_seconds < 1)){
                clearInterval(_CountDown);
                _this.EndEvent.classList.add('revealed');
                _this.RowCells.classList.add('hidden');
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