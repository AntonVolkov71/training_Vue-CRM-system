import _ from 'lodash';

export default {
   data(){
     return{
       page: +this.$route.query.page || 1,// дефолтная тсраница
       pageSize: 5,
       pageCount:0, // по умолчанрию кол-во странци
       allItems:[], // весь массив
       items:[]// тот который будет отображаться
     }
   },
   methods: {
     setupPagination(allItems){
      //install npm i lodash
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
     },
     pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[ page - 1] || this.allItems[0];
     },
   },
}
