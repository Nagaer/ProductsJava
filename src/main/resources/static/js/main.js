
function getIndex(list, id) {
    for (let i = 0; i<list.length; ++i) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}


var productApi = Vue.resource('/product{/id}');

Vue.component('product-form', {
    props: ['products', 'productAttr', 'switchFormAdd'],
    data: function () {
        return {
            name: '',
            description: '',
            create_date: '',
            place_storage: '',
            reserved: false,
            id: ''
        }
    },
    watch: {
        productAttr: function(newVal, oldVal) {
            this.name = newVal.name;
            this.description = newVal.description;
            this.create_date = newVal.create_date;
            this.place_storage = newVal.place_storage;
            this.reserved = newVal.reserved;
            this.id = newVal.id;
        }
    },
    template:
        '<tr>' +
            '<td></td>' +
            '<td><input type="text" placeholder="Укажите название" v-model="name"/></td>' +
            '<td><textarea placeholder="Опишите товар" cols="25" rows="8" v-model="description"/></td>' +
            '<td><input type="date" v-model="create_date"/></td>' +
            '<td><input type="number" v-model="place_storage"/></td>' +
            '<td><input type="checkbox" id="check_res" v-model="reserved"/></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td><input type="button" value="Сохранить" @click="save" /></td>' +
        '</tr>',
    methods: {
        save: function () {
            this.switchFormAdd(false);
            var product = {
                name : this.name,
                description : this.description,
                create_date : this.create_date,
                place_storage : this.place_storage,
                reserved : this.reserved
            };

            if (this.id) {
                productApi.update({id: this.id}, product).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.products, data.id);
                        this.products.splice(index, 1, data);
                        this.name = '';
                        this.description = '';
                        this.create_date = '';
                        this.place_storage = '';
                        this.reserved = false;
                        this.id = '';
                    })
                )
            } else {
                productApi.save({}, product).then(result =>
                    result.json().then(data => {
                        this.products.push(data);
                        this.name = '';
                        this.description = '';
                        this.create_date = '';
                        this.place_storage = '';
                        this.reserved = false;
                    })
                )
            }
        }
    }
});

Vue.component('product-row', {
    props: ['product', 'products', 'editMethod', 'switchFormEdit'],
    template:
        '<tr>' +
            '<td>{{product.id}}</td> ' +
            '<td>{{product.name}}</td> ' +
            '<td>{{product.description}}</td> ' +
            '<td>{{product.create_date}}</td> ' +
            '<td>{{product.place_storage}}</td> ' +
            '<td>{{product.reserved?"Да":"Нет"}}</td> ' +
            '<td><input type="button" value="Ред." @click="edit"/></td>' +
            '<td><input type="button" value="Удал." @click="del"/></td>' +
        '</tr>',
    methods: {
        edit: function () {
            this.switchFormEdit(true);
            this.editMethod(this.product);
        },
        del: function () {
            productApi.remove({id: this.product.id}).then(result => {
                if (result.ok) {
                    this.products.splice(this.products.indexOf(this.product), 1);
                }
            })
        }
    }
});

Vue.component('products-list', {
    props: ['products'],
    data: function() {
        return {
            product: null,
            visible: false
        }
    },
    template:
        '<div style="position: relative; width: 300px;">' +
            '<a class="create_product" @click="visible=!visible">{{visible?"Отмена":"Создать"}}</a>' +
            '<table>' +
            '<tr><th colspan="8">Список товаров</th></tr>' +
            '<tr>' +
                '<th>№</th>' +
                '<th>Название товара</th>' +
                '<th>Описание товара</th>' +
                '<th>Дата добавления товара в базу</th>' +
                '<th>Номер ячейки хранения</th>' +
                '<th>Товар зарезервирован?</th>' +
                '<th>Редактировать?</th>' +
                '<th>Удалить?</th>' +
            '</tr>' +
            '<product-row v-for="product in products" :key="product.id" :product="product" ' +
                ':editMethod="editMethod" :products="products" :switchFormEdit="switchForm" />' +
            '<product-form v-show="visible" :products="products" :productAttr="product" :switchFormAdd="switchForm" />' +
            '</table>' +
        '</div>',
    created: function () {
        productApi.get().then(result =>
            result.json().then(data =>
                data.forEach(product => this.products.push(product))
            )
        )
    },
    methods: {
        editMethod: function (product) {
            this.product = product;
        },
        switchForm: function (visible) {
            this.visible = visible;
        }
    }
});

var app = new Vue({
    el: '#app',
    template: '<products-list :products="products" />',
    data: {
        products: []
    }
});