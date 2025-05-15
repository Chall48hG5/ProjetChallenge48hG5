import React from 'react';

const styles = {
    header: {
        color: "#fff",
        padding: "20px",
        display: "flex",
        justifyContent: "space-around",
        fontSize: "25px",
        marginTop: "20px",
    },
    button: {
        backgroundColor: "gray",
        border: "1px solid black",
        padding: "10px",
        borderRadius: "10px",
    }
}




const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-5xl">V.I.G.I.L</h1>
        
        </header>
    );
}

export default Header;