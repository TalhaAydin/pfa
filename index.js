import '/node_modules/@polymer/paper-styles/paper-styles.js';
import '/src/app/pf-app.js';
import '../@webcomponents/webcomponentsjs/webcomponents-loader.js';
import './src/app/transactions/redux.constants.js';
import './src/app/transactions/redux.actions.js';
import './src/app/transactions/redux.reducer.js';
import './src/app/expenses/redux.expenses.js';
import './src/app/income/redux.income.js';
import './src/app/redux.store.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = `<title>Personal Finance Application</title><pf-app></pf-app>`;
document.head.appendChild($_documentContainer);
/* See https://goo.gl/OOhYW5 */
window.firebase.initializeApp({
  apiKey: 'AIzaSyBV66yNWXGdqNBqfPc2EZQ4M8dCqGAINjU',
  authDomain: 'personal-finance-app-fa8d3.firebaseapp.com',
  databaseURL: 'https://personal-finance-app-fa8d3.firebaseio.com',
  projectId: 'personal-finance-app-fa8d3',
  storageBucket: 'personal-finance-app-fa8d3.appspot.com',
  messagingSenderId: '707314505670',
});
