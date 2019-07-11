function Item(Element, BasketSys){
    this.Element = Element;
    this.BasketSys = BasketSys;
    this.Clicked = false;
    this.ElementPosOrigine = null;
    this.ItemLabel = null;

    this.MakeItem = function(){
        this.Element.classList.add('item');
        this.ItemLabel = this.Element.getAttribute('item-label');
        this.ElementPosOrigine = this.Element.style.position;
        if((this.ElementPosOrigine == '') || (this.ElementPosOrigine == 'static')){
            this.Element.style.position = 'relative';
        }
        this.ItemHandler = document.createElement('div');
        this.ItemHandler.style.position = 'absolute';
        this.ItemHandler.style.top = '0';
        this.ItemHandler.style.left = '0';
        this.ItemHandler.style.width = '100%';
        this.ItemHandler.style.height = '100%';
        this.ItemHandler.style.zIndex = '1000000';
        this.ItemHandler.addEventListener('mousedown', this.MouseDown.bind(this));
        this.ItemHandler.addEventListener('mouseup', this.MouseUp.bind(this));
        this.ItemHandler.addEventListener('mousemove', this.MouseMove.bind(this));
        this.ItemHandler.addEventListener('mouseout', this.MouseUp.bind(this));
        this.Element.appendChild(this.ItemHandler);
    };

    this.MouseDown = function(){
        this.Clicked = true;
        this.Element.classList.add('item-moved');
        this.Element.style.width = this.Element.getBoundingClientRect().width + 'px';
        this.Element.style.position = 'absolute';
        this.Element.style.zIndex = '1000000';
        this.Element.style.left = event.pageX - (this.Element.getBoundingClientRect().width / 2) + 'px';
        this.Element.style.top = event.pageY - (this.Element.getBoundingClientRect().height / 2) + 'px';
        document.body.appendChild(this.Element);
    };

    this.MouseUp = function(){
        if(this.Clicked){
            this.Clicked = false;
            if((this.ElementPosOrigine == '') || (this.ElementPosOrigine == 'static')){
                this.Element.style.position = 'relative';
            }
            this.Element.style.zIndex = '';
            this.Element.style.left = '';
            this.Element.style.top = '';
            this.Element.classList.remove('item-moved');
            this.Element.style.width = '';
            this.DropItem(event);
        }
    };

    this.MouseMove = function(event){
        if(this.Clicked){
            this.Element.style.left = event.pageX - (this.Element.getBoundingClientRect().width / 2) + 'px';
            this.Element.style.top = event.pageY - (this.Element.getBoundingClientRect().height / 2) + 'px';
        }
    };

    this.InDropZone = function(event){
        var _InDropZone = false;
        if((event.pageX > this.BasketSys.Basket.getBoundingClientRect().left) && (event.pageX < (this.BasketSys.Basket.getBoundingClientRect().left + this.BasketSys.Basket.getBoundingClientRect().width)) && (event.pageY > this.BasketSys.Basket.getBoundingClientRect().top) && (event.pageY < (this.BasketSys.Basket.getBoundingClientRect().top + this.BasketSys.Basket.getBoundingClientRect().height))){
            _InDropZone = true;
        }
        return _InDropZone;
    };

    this.DropItem = function(event){
        if(this.InDropZone(event)){
            this.BasketSys.Basket.appendChild(this.Element);
            if(this.BasketSys.GetIndexOfElement(this) == -1){
                this.BasketSys.AddItem(this);
                this.BasketSys.Basket.classList.add('basket-sys-dropped');
                var _this = this;
                setTimeout(function(){
                    _this.BasketSys.Basket.classList.remove('basket-sys-dropped');
                }, 200);
            }
        }
        else{
            this.BasketSys.Items.appendChild(this.Element);
            this.BasketSys.RemoveItem(this);
        }
    };
}

function BasketSys(BasketID, ItemsID, InputTargetID){
    this.BasketID = BasketID;
    this.Basket = document.getElementById(this.BasketID);
    this.ItemsID = ItemsID;
    this.Items = document.getElementById(this.ItemsID);
    this.InputTargetID = InputTargetID;
    this.Input = document.getElementById(this.InputTargetID);
    this.ItemsList = [];

    this.ActivateBasket = function(){
        this.Input.type = 'hidden';
        this.Basket.classList.add('basket-sys')
        this.CreateItems();
    };

    this.CreateItems = function(){
        var _Items = this.Items.children;
        var _Item = null;
        for(var i = 0 ; i < _Items.length ; i++){
            _Item = new Item(_Items[i], this);
            _Item.MakeItem();
        }
    };

    this.BuildInputList = function(){
        var _Str = '';
        for(var i = 0 ; i < this.ItemsList.length ; i++){
            _Str += this.ItemsList[i].ItemLabel;
            if(i < (this.ItemsList.length - 1)){
                _Str += ', ';
            }
        }
        this.Input.value = _Str;
    };

    this.GetIndexOfElement = function(_Element){
        var _Index = -1;
        var i = 0;
        while((i < this.ItemsList.length) && (this.ItemsList[i] !== _Element)){
            i++;
        }
        if(this.ItemsList[i] === _Element){
            _Index = i;
        }
        return _Index;
    };

    this.AddItem = function(Item){
        this.ItemsList.push(Item);
        this.BuildInputList();
    };

    this.RemoveItem = function(Item){
        var _Index = 0;
        while((_Index < this.ItemsList.length) && (this.ItemsList[_Index] !== Item)){
            _Index++;
        }
        this.ItemsList.splice(_Index, 1);
        this.BuildInputList();
    };
}