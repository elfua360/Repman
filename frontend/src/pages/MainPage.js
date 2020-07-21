import React from 'react'

import Search from '../components/Search'

import CreateRecipe from '../components/CreateRecipe'

const MainPage = () => {
    return (
        <>
            <div>
                <Search/>
                <CreateRecipe/>
            </div>
        </>
    )
}

export default MainPage;