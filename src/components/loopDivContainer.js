import React from 'react';
const string = ["Donnée de base de donnée 1", "Donnée de base de donnée 2", "Donnée de base de donnée 3"];

const styles = {
    div: {
        color: "#fff",
        padding: "20px",
        display: "flex",
        justifyContent: "space-around",
        fontSize: "25px",
        backgroundImage: "linear-gradient(to right, rgba(255, 126, 95, 0.5), rgba(254, 180, 123, 0.5))",
        border: "1px solid black",
        padding: "100px",
        marginTop: "20px",
    },

    backgrd :{
        backgroundImage: "url('/inondation.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        withth: "100%",
        height: "100vh",
        paddingTop: "20px",

    }
}

const LoopDivContainer = () => {
    return (
        <div style={styles.backgrd}>
            {string.map(item => 
                <div style={styles.div} key={item}>
                    {item}
                </div>
            )}
        </div>
    );
}

export default LoopDivContainer;