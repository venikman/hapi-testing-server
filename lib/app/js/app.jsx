import React from 'react';

const App = {
    render() {
        return (
            <div>
                <section>
                    <h1>Venikman</h1>
                    <p>Thanks for visiting.</p>
                </section>
                <section>
                    <ul>
                        <p>links:</p>
                        <li>
                            <a href="https://www.facebook.com/venik.man" className="fa fa-facebook is-white" />
                        </li>
                        <li>
                            <a href="https://www.github.com/venikman" className="fa fa-github" />
                        </li>
                        <li>
                            <div>Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
};

export default App;
