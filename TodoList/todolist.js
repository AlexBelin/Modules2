function TodoListItem(Label, TodoListSys){
    this.Label = Label;
    this.TodoListSys = TodoListSys;

    this.MakeItem = function(){
        this.ItemCell = document.createElement('div');
        this.ItemCell.classList.add('todolist-cell');
        this.Item = document.createElement('div');
        this.Item.classList.add('todolist-item');
        this.Item.appendChild(document.createTextNode(this.Label));
        this.DelItem = document.createElement('div');
        this.DelItem.classList.add('del-item');
        this.DelItem.addEventListener('click', this.DeleteItem.bind(this));
        this.Item.appendChild(this.DelItem);
        this.ItemCell.appendChild(this.Item);
        this.TodoListSys.TodoList.appendChild(this.ItemCell);
    };

    this.DeleteItem = function(){
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

    this.ActivateTodoList = function(){
        this.Input.type = 'hidden';
        this.TodoListInputContainer = document.createElement('div');
        this.TodoListInputContainer.classList.add('todolist-sys');
        this.LabelTodoInput = document.createElement('input');
        this.LabelTodoAddButton = document.createElement('div');
        this.LabelTodoAddButton.classList.add('todolist-button');
        this.LabelTodoAddButton.addEventListener('click', this.AddItem.bind(this));
        this.TodoListInputContainer.appendChild(this.LabelTodoInput);
        this.TodoListInputContainer.appendChild(this.LabelTodoAddButton);
        this.TodoList.appendChild(this.TodoListInputContainer);
        this.RebuildList();
    }

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
}