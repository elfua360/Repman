import React from 'react';

import Search from '../components/Search';
import PageTitle from '../components/PageTitle'

const MainPage = () => {
    return (
        <>
            <div>
                <PageTitle/>
                <Search/>
            </div>
        </>
    );
};

export default MainPage;