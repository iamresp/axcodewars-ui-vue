import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueFeather from 'vue-feather';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import App from './App.vue';
import router from './router';

import 'highlight.js/styles/a11y-dark.css';
import './styles';

hljs.registerLanguage('ts', javascript);
hljs.registerLanguage('js', typescript);

const app = createApp(App);

app.component(VueFeather.name, VueFeather);
app.use(hljsVuePlugin);
app.use(createPinia());
app.use(router);
app.mount('body');
