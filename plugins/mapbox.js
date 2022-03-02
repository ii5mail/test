import Vue from 'vue';
import { MglMap, MglGeojsonLayer, MglVectorLayer, MglPopup } from "vue-mapbox";
import Mapbox from 'mapbox-gl';

Vue.component('MglMap', MglMap);
Vue.component('MglGeojsonLayer', MglGeojsonLayer);
Vue.component('MglVectorLayer', MglVectorLayer);
Vue.component('MglPopup', MglPopup);

Vue.prototype.$mapbox = Mapbox;