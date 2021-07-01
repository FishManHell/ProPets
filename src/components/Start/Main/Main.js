import React from 'react';
import SectionWelcom from "./SectionWelcom";
import SectionOur from "./SectionOur";
import SectionInformPets from "./SectionInformPets";
import SectionComingSon from "./SectionComingSon";

const Main = () => {
    return (
        <main>
            <SectionWelcom/>
            <SectionOur/>
            <SectionInformPets/>
            <SectionComingSon/>
        </main>
    );
};

export default Main;