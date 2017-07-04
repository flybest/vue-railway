<script>
// import _ from 'lodash'
import DatasourceUtils from './utils/DatasourceUtils'
import Pagination from './Pagination.vue'
import { EventBus } from './utils/EventBus'
import connection from 'assets/js/connection'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'ServerDatasource',
  components: {
    Pagination,Spinner
  },
  render (h) {
    return (
      <div class="vue-server-datasource">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <div class="datatable-length">
              {this.tableLength}
            </div>
          </div>
          <div class="col-md-9 col-sm-12 col-xs-12">
            <div class="datatable-filter">
              {this.tableFilter}
              {this.$slots.filterAction}
            </div>
          </div>
        </div>
        <div class="datatable-content">
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  { this.columnItems }
                </tr>
              </thead>
              <tbody>
                { this.columnObjects }
              </tbody>
            </table>
          </div>
          { this.spinnerItem }
        </div>

        <div class="row">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="datatable-info">
              {this.tableInfo}
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="datatable-pagination">
              {this.tablePagination}
            </div>
          </div>
        </div>
      </div>
    )
  },
  props: {
    /**
     * Table source url
     * @type {Array}
     */
    source: {
      type: String,
      required: true
    },
    /**
     * Limits to display
     * @type {Array}
     */
    limits: {
      type: Array,
      default () {
        return [1, 5, 10, 15, 20]
      }
    },
    /**
     * Translation to display
     * @type {Object}
     */
    translation: {
      type: Object,
      default () {
        return {
          limit: 'Limit',
          search: 'Search',
          placeholder_search: 'Type to search..',
          records_not_found: 'No records found',
          pagination: {
            show: 'Showing',
            to: 'to',
            of: 'of',
            entries: 'entries'
          }
        }
      }
    },
    /**
     * Columns to display
     * @type {Array}
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * Action buttons
     * @type {Array}
     */
    actions: {
      type: Array,
      default () {
        return []
      }
    },
    showLength:{
      type: Boolean,
      default (){
        return true
      }
    },
    showFilter:{
      type: Boolean,
      default (){
        return true
      }
    },
    showInfo:{
      type: Boolean,
      default (){
        return true
      }
    },
    showPagination:{
      type: Boolean,
      default (){
        return true
      }
    }
  },
  created () {
    EventBus.$on('pagination-change', this.changePage)
    this.setData()
  },
  data () {
    return {
      perpage: 10,
      tableData: [],
      loading: false,
      selected: null, // row and Object selected on click event
      indexSelected: -1, // index row selected on click event
      search: '', // word to search in the table,
      pagination: {
        total: 0,
        to: 0,
        from: 0,
        per_page: 10,
        current_page: 1
      }
    }
  },
  computed: {
    spinnerItem () {
      if (this.loading) {
        return <div class="vue-spinner-wrapper">
          <Spinner class='spin-background' line-size={5} line-bg-color={'rgba(255, 255, 255, 0.5)'}></Spinner>
        </div>
      }
    },
    limitOptions () {
      return this.limits.map((limit, index) => {
        return <option value={ limit } selected={ parseInt(this.perpage) === parseInt(limit) }>{ limit }</option>
      })
    },
    columnItems () {
      return this.columns.map((column, index) => {
        return <th>{ column.name }</th>
      })
    },
    columnObjects () {
      if (this.tableData.length === 0) {
        return <tr class="text-center">
          <td colspan={ this.columns.length }>{ this.translation.records_not_found }</td>
        </tr>
      } else {
        return this.tableData.map((row, index) => {
          let columns = this.columns.map((column, index) => {
            return <td domPropsInnerHTML={ this.fetchFromObject(row, column.key, column.render) }></td>
          })
          return <tr class={{ success: index === this.indexSelected }} on-click={ (e) => this.selectRow(e, row, index) }>{ columns }</tr>
        })
      }
    },
    actionsObject () {
      return this.actions.map((action, index) => {
        try {
          if (action.show(this.selected)) {
            return <button class={this.dynamicClass('btn', action.class)} type="button" on-click={ (e) => action.event(e, this.selected) }>
              <i class={ this.dynamicClass('pr1', action.icon) }></i>
              { action.text }
            </button>
          }
        } catch (ex) {
          console.warn(`[VueDatasource] The callback show is not defined in action ${action.text}.`)
        }
      })
    },
    tableInfoContent: DatasourceUtils.tableInfo,
    tableLength(){
      if(this.showLength){
        return <label class="control-label">{ this.translation.limit }
          <select on-change={ (e) => this.sync('perpage', parseInt(e.target.value)) } class="form-control ml" number >
            { this.limitOptions }
          </select>
        </label>
      }
    },
    tableFilter(){
      if(this.showFilter){
        return <input class="form-control" type="text" on-input={ (e) => this.sync('search', e.target.value) } placeholder={this.translation.placeholder_search} />
      }
    },
    tableInfo(){
      if(this.showInfo){
        return this.tableInfoContent
      }
    },
    tablePagination(){
      if(this.showPagination){
        return <pagination pages={ this.pagination }></pagination>
      }
    }
  },
  methods: {
    fetchFromObject: DatasourceUtils.fetchFromObject,
    changePage: DatasourceUtils.changePage,
    selectRow: DatasourceUtils.selectRow,
    dynamicClass (defaultClass, customClass) {
      return `${defaultClass} ${customClass}`
    },
    sync (prop, value) {
      this[prop] = value
    },
    searching (e) {
      this.selected = null
      this.indexSelected = -1
      this.pagination.current_page = 1
      this.setData()
      this.$emit('searching', this.search)
    },
    setData () {
      this.loading = true
      this.apiGet(`${this.source}?per_page=${this.perpage}&page=${this.pagination.current_page}&search=${this.search}`,'').then((res)=>{
        this.loading = false
        this.tableData = res.data
        this.pagination = res.pagination
        this.perpage = this.pagination.per_page
      },(err)=>{
        this.loading = false
        console.warn(`[VueDatasource] ${error}`)
      })
    }
  },
  watch: {
    /**
     * Handle show limit changed.
     * @return {void}
     */
    perpage () {
      this.selected = null
      this.indexSelected = -1
      this.pagination.current_page = 1
      this.setData()
      this.$emit('change', {perpage: this.perpage, page: 1})
    },
    tableData () {
      this.selected = null
      this.indexSelected = -1
    },
    search: _.debounce(function () {
      this.setData()
    }, 500)
  },
  mixins:[connection]
}
</script>

<style lang="scss" scoped>
.vue-server-datasource {
  .datatable-length{
    label{
      font-weight: normal;
      text-align: left;
      white-space: nowrap;
    }

    select{
      width: 75px;
      display: inline-block;
    }
  }
  .datatable-filter{
    float:right;

    label{
      font-weight: normal;
      white-space: nowrap;
      text-align: left;
    }

    input{
      margin-left: 0.5em;
      display: inline-block;
      width: auto;
    }
  }

  .datatable-content{
    margin:10px 0;

    .table{
      margin:0;

      th,td{
        padding-top:10px;
        padding-bottom:10px;
      }
    }
  }

  .datatable-info{
    padding-top: 8px;
    white-space: nowrap;
  }

  .datatable-pagination{
    margin: 0;
    white-space: nowrap;
    text-align: right;
    float: right;
    padding-top: 0.25em;
  }

  .vue-spinner-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.pr1 {
  padding-right: 5px;
}
.ml {
  margin-left: 10px;
}
</style>
