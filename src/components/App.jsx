import renderAuthRoutes from './../utils/renderAuthRoutes';

const App = ({ route }) => renderAuthRoutes(route.routes);

export default App;
