function BookerElement(DayElement, HourElement, BookerSys){
    this.DayElement = DayElement;
    this.HourElement = HourElement;
    this.BookerSys = BookerSys;
    this.Elem = null;

    this.MakeElement = function(){
        this.Elem = document.createElement('div');
        this.Elem.classList.add('table-sys-elem');
        this.ElemCheckbox = document.createElement('input');
        this.ElemCheckbox.type = 'checkbox';
        this.ElemCheckbox.value = '[' + this.DayElement + '|' + this.HourElement + ']';
        this.ElemCheckbox.id = this.DayElement.replace(' ', '-').replace('/', '_') + '-' + this.HourElement;
        this.ElemLabel = document.createElement('label');
        this.ElemLabel.setAttribute('for', this.ElemCheckbox.id);
        this.ElemLabel.addEventListener('click', this.CheckElement.bind(this));

        this.Elem.appendChild(this.ElemCheckbox);
        this.Elem.appendChild(this.ElemLabel);
        return this.Elem;
    };

    this.CheckElement = function(){
        if(!this.ElemCheckbox.checked){
            this.BookerSys.AddElemToList(this);
        }
        else{
            this.BookerSys.RemoveElemFromList(this);
        }
    };
}

function BookerSys(BookerID, Content, InputTargetID){
    this.BookerID = BookerID;
    this.Booker = document.getElementById(this.BookerID);
    this.Content = Content;
    this.InputTargetID = InputTargetID;
    this.Input = document.getElementById(this.InputTargetID);
    this.ItemsList = [];

    this.ActivateBooker = function(){
        this.Input.type = 'hidden';
        this.BuilTable();
    };

    this.BuilTable = function(){
        var _Table = document.createElement('div');
        _Table.cellPadding = '0';
        _Table.cellSpacing = '0';
        _Table.border = '0';
        _Table.classList.add('table-sys');
        //First Line
        var _RowTable = document.createElement('div');
        _RowTable.classList.add('table-row');
        for(var col = 0 ; col <= this.Content.Days.length ; col++){
            var _TdTable = document.createElement('div');
            _TdTable.classList.add('table-cell');
            _TdTable.style.width =  (100 / (this.Content.Days.length + 1)) + '%';
            if(col > 0){
                var _Label = document.createElement('div');
                _Label.classList.add('table-label');
                _Label.appendChild(document.createTextNode(this.Content.Days[col - 1]));
                _TdTable.appendChild(_Label);
            }
            _RowTable.appendChild(_TdTable);
        }
        _Table.appendChild(_RowTable);
        //----------
        for(var row = 0 ; row < this.Content.Hours.length ; row++){
            var _RowTable = document.createElement('div');
            _RowTable.classList.add('table-row');
            for(var col = 0 ; col <= this.Content.Days.length ; col++){
                var _TdTable = document.createElement('div');
                _TdTable.classList.add('table-cell');
                _TdTable.style.width =  (100 / (this.Content.Days.length + 1)) + '%';
                if(col == 0){
                    var _Label = document.createElement('div');
                    _Label.classList.add('table-label');
                    _Label.appendChild(document.createTextNode(this.Content.Hours[row]));
                    _TdTable.appendChild(_Label);
                }
                else{
                    var _TdElement = new BookerElement(this.Content.Days[col - 1], this.Content.Hours[row], this);
                    _TdTable.appendChild(_TdElement.MakeElement());
                }
                _RowTable.appendChild(_TdTable);
            }
            _Table.appendChild(_RowTable);
        }

        this.Booker.appendChild(_Table);
    };

    this.AddElemToList = function(_Element){
        this.ItemsList.push(_Element);
        this.SortItemsList();
        this.WriteItemsLists();
    };

    this.RemoveElemFromList = function(_Element){
        this.ItemsList.splice(this.ItemsList.indexOf(_Element), 1);
        this.SortItemsList();
        this.WriteItemsLists();
    };

    this.WriteItemsLists = function(){
        var _Str = '';
        for(var _Days = 0 ; _Days < this.Content.Days.length ; _Days++){
            if(this.GetIndexByDay(this.Content.Days[_Days]) != -1){
                if(_Str != ''){
                    _Str += '<br />';
                }
                _Str += this.Content.Days[_Days] + ': ';
            }
            for(_Index = 0 ; _Index < this.ItemsList.length ; _Index++){
                if(this.ItemsList[_Index].DayElement == this.Content.Days[_Days]){
                    _Str += this.ItemsList[_Index].HourElement;
                    if(_Index < (this.ItemsList.length - 1)){
                        if((this.ItemsList[_Index].DayElement == this.ItemsList[_Index + 1].DayElement) && (_Index < (this.ItemsList.length - 1))){
                            _Str += ', ';
                        }
                    }
                }
            }
        }
        this.Input.value = _Str;
    };

    this.GetIndexByDay = function(_Day){
        var _Index = -1;
        for(var i = 0 ; i < this.ItemsList.length ; i++){
            if(this.ItemsList[i].DayElement == _Day){
                _Index = i;
                break;
            }
        }
        return _Index;
    };

    this.SortItemsList = function(){
        var _TempItemsList = [];
        for(var _Day = 0 ; _Day < this.Content.Days.length ; _Day++){
            for(var _Hours = 0 ; _Hours < this.Content.Hours.length ; _Hours++){
                for(_Index = 0 ; _Index < this.ItemsList.length ; _Index++){
                    if((this.ItemsList[_Index].HourElement == this.Content.Hours[_Hours]) && (this.ItemsList[_Index].DayElement == this.Content.Days[_Day])){
                        _TempItemsList.push(this.ItemsList[_Index]);
                    }
                }
            }
        }
        this.ItemsList = _TempItemsList;
    };
}