import React from 'react';
import ReactDOM from 'react-dom';
import Explorer from './components/Explorer';

const App = () => {
    return (
        <div>
            <Explorer />
        </div>
    );
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
