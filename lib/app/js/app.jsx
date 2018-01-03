import React from 'react';

import UserInformation from './components/user-imformation.jsx';

const App = () => {
    const getRandomKey = () => {
        return Math.random();
    };
    return (
        <section>
            <div className="grid">
                <div id="1">1</div>
                <div id="2" className="horizontal">2</div>
                <UserInformation id="3" name="Stan" />
                <div id="4" className="vertical">4</div>
                <div id="5" className="big"><a href="/login">Log in</a></div>
                <div id="6" className="horizontal">6</div>
                <div id="7" className="vertical">7</div>
                <div id="8"><a href="/lohout">Log out</a></div>
                <div id="9" className="big">9</div>
                <div id="10">10</div>
                <div id="11" className="vertical">11</div>
            </div>
            <div
                key={getRandomKey()}
                className="testClass"
            />
        </section>
    );
};

export default App;
