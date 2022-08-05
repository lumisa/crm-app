import styled from "styled-components";

const card = `

    overflow: auto;
    border-radius: 5px;
    height: auto;
    padding: 0.5rem;
    background-color: #fff;


`

export const Main = styled.div`
    display: grid;
    gap: 2rem;
    grid-template: 
    "header header header"
    "panel2 panel3 panel1" 300px
    "panel2 panel3 panel1" 900px / 1fr 1fr 1fr
    ;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    grid-area: header;
`

export const Panel1 = styled.div`
grid-area: panel1;
${card}
`
export const Panel3 = styled.div`
    grid-area: panel3;
    ${card}
    `

export const Panel2 = styled.div`
    grid-area: panel2;
    ${card}
    `

export const Row = styled.div`

display: flex;
justify-content: space-between;
align-items: center;
`
export const Item = styled.div`
    margin-top: 2rem;
    border: 1px solid #CECECE;
    padding: 1rem;
    border-radius: 5px;

`