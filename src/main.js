import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'
import Clipboard from 'v-clipboard'
import i18n from "./i18n";
import {Web3Modal} from './components'

import {
  Dialog,
  Dropdown,
  DropdownMenu,	
  DropdownItem,
  Input,
  Radio,
  Checkbox,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Popover,
  Tooltip,
  Form,
  FormItem,
  TabPane,
  Tag,
  Alert,
  Icon,
  Row,
  Col,
  Spinner,
  Rate,
  Container,
  Header,
  Main,
  Footer,
  Link,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification,
  Drawer
} from 'element-ui';
import './element-variables.scss'
import './main.scss'
import 'element-ui/lib/theme-chalk/display.css';

import {
  TableEmpty
} from "@/components/index"

Vue.use(TableEmpty);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);	
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Spinner);
Vue.use(Rate);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Link);
Vue.use(Image);
Vue.use(Drawer);

Vue.use(Loading.directive);
Vue.use(Web3Modal, {i18n});
Vue.use(VueApollo)
Vue.use(Clipboard)

Vue.prototype.$store = store;

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
