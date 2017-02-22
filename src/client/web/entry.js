/**
 * Created by liujinhe on 17/2/22.
 */

var routes = require('./routes');
var ReactDom = require('react-dom');
var React = require('react');

var render = routes=> {
    console.log('asfd');
    ReactDom.render(<div>{routes}</div>, document.getElementById('app'))

}

render(routes);

if (module.hot) {
    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        render(newRoutes);
    });
}


//if (module.hot) {
//    module.hot.accept();
//}