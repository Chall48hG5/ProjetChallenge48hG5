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
        <header className="bg-gray-800 text-white text-center">
        <h1 className="text-5xl">V.I.G.I.L</h1>
        <nav>
            <ul style={styles.header}>
            <li><a href="/prevention" style={styles.button} className="hover:text-gray-400" >Prévention</a></li>
            <li><a href="/prediction" style={styles.button} className="hover:text-gray-400">Prédiction</a></li>
            <li><a href="/actualite" style={styles.button} className="hover:text-gray-400">Actualité</a></li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;