function TodoListItem(Label, TodoListSys){
    this.Label = Label;
    this.TodoListSys = TodoListSys;
    this.Clicked = false;

    this.MakeItem = function(){
        this.ItemCell = document.createElement('div');
        this.ItemCell.classList.add('todolist-cell');
        this.Item = document.createElement('div');
        this.Item.classList.add('todolist-item');
        this.Item.appendChild(document.createTextNode(this.Label));
        this.Item.addEventListener('mouseenter', this.MouseEnter.bind(this));
        this.Item.addEventListener('mouseout', this.MouseUp.bind(this));
        this.DelItem = document.createElement('div');
        this.DelItem.classList.add('del-item');
        this.DelItem.addEventListener('click', this.DeleteItem.bind(this));
        this.HandleItem = document.createElement('div');
        this.HandleItem.classList.add('handle-item');
        this.HandleItem.addEventListener('mousedown', this.MouseDown.bind(this));
        this.HandleItem.addEventListener('mouseup', this.MouseUp.bind(this));
        this.HandleItem.addEventListener('mousemove', this.MouseMove.bind(this));
        this.Item.appendChild(this.DelItem);
        this.Item.appendChild(this.HandleItem);
        this.ItemCell.appendChild(this.Item);
        this.TodoListSys.RowCell.appendChild(this.ItemCell);
        this.ItemCell.style.width = this.Item.getBoundingClientRect().width + 8 + 'px';
    };

    this.MouseDown = function(){
        this.TodoListSys.ItemClicked = this;
        this.Clicked = true;
        this.Item.classList.add('item-moved');
    };

    this.MouseUp = function(){
        this.Clicked = false;
        var _this = this;
        this.Item.style.position = '';
        this.Item.style.zIndex = '';
        this.Item.style.left = '';
        this.Item.style.top = '';
        this.Item.classList.remove('item-moved');
        setTimeout(function(){
            _this.TodoListSys.SortList();
        }, 60);
    };

    this.MouseMove = function(event){
        if(this.Clicked){
            this.Item.style.position = 'absolute';
            this.Item.style.zIndex = '1000000';
            this.Item.style.left = event.pageX - (this.Item.getBoundingClientRect().width / 2) + 'px';
            this.Item.style.top = event.pageY - (this.Item.getBoundingClientRect().height / 2) + 'px';
        }
    };

    this.MouseEnter = function(){
        this.TodoListSys.ItemOver = this;
    };

    this.DeleteItem = function(event){
        event.stopPropagation();
        this.ItemCell.remove();
        this.TodoListSys.RemoveItem(this);
    };
}

function TodoListSys(TodoListID, InputTargetID){
    this.TodoListID = TodoListID;
    this.TodoList = document.getElementById(this.TodoListID);
    this.InputTargetID = InputTargetID;
    this.Input = document.getElementById(this.InputTargetID);
    this.ItemList = [];
    this.ItemOver = null;
    this.ItemClicked = null;

    this.ActivateTodoList = function(){
        this.Input.type = 'hidden';
        this.TodoListInputContainer = document.createElement('div');
        this.TodoListInputContainer.classList.add('todolist-sys');
        this.LabelTodoInput = document.createElement('input');
        this.LabelTodoInput.addEventListener('keyup', this.ValidationLabel.bind(this));
        this.LabelTodoAddButton = document.createElement('div');
        this.LabelTodoAddButton.classList.add('todolist-button');
        this.LabelTodoAddButton.addEventListener('click', this.AddItem.bind(this));
        this.RowCell = document.createElement('div');
        this.TodoListInputContainer.appendChild(this.LabelTodoInput);
        this.TodoListInputContainer.appendChild(this.LabelTodoAddButton);
        this.TodoList.appendChild(this.TodoListInputContainer);
        this.TodoList.appendChild(this.RowCell);
        this.RebuildList();
    }

    this.ValidationLabel = function(event){
        if(event.keyCode == 13){
            this.AddItem();
        }
    };

    this.AddItem = function(){
        var _TempInput = this.LabelTodoInput.value.replace(/ /g, '');
        if(_TempInput != ''){
            var _NewItem = new TodoListItem(this.LabelTodoInput.value, this);
            _NewItem.MakeItem();
            this.ItemList.push(_NewItem);
            this.UpdateItemsList();
        }
        this.LabelTodoInput.value = '';
        this.LabelTodoInput.innerHTML = '';
    };

    this.UpdateItemsList = function(){
        var _Str = '';
        for(var i = 0 ; i < this.ItemList.length ; i++){
            _Str += this.ItemList[i].Label;
            if(i < this.ItemList.length - 1){
                _Str += ', ';
            }
        }
        this.Input.value = _Str;
    }

    this.RemoveItem = function(Elem){
        var _Index = 0;
        while(this.ItemList[_Index] !== Elem){
            _Index++;
        }
        this.ItemList.splice(_Index, 1);
        this.UpdateItemsList();
    };

    this.RebuildList = function(){
        var _TempArray = this.Input.value.split(', ');
        for(var i = 0 ; i < _TempArray.length ; i++){
            this.LabelTodoInput.value = _TempArray[i];
            this.AddItem();
        }
        this.LabelTodoInput.value = '';
    };

    this.SortList = function(){
        if(this.ItemClicked !== null && this.ItemOver !== null){
            var _insertedNode = this.RowCell.insertBefore(this.ItemClicked.ItemCell, this.ItemOver.ItemCell.nextSibling);
            this.PermuteElementsList();
            this.ItemClicked = null;
            this.ItemOver = null;
        }
    };

    this.PermuteElementsList = function(){
        var _Index1 = 0;
        var _Index2 = 0;
        var _TempItem = null;
        for(var i = 0 ; i < this.ItemList.length ; i++){
            if(this.ItemList[i] === this.ItemClicked){
                _Index1 = i;
            }
            if(this.ItemList[i] === this.ItemOver){
                _Index2 = i;
            }
        }
        this.ItemList.splice(_Index1, 1);
        if(_Index1 > _Index2){
            _Index2++;
        }
        this.ItemList.splice(_Index2, 0, this.ItemClicked);
        this.UpdateItemsList();
    };
}