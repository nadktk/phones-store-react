import styled from 'styled-components';

export default styled.button`
    text-transform: capitalize;
    border-radius: 5px;
    padding: 5px 15px;
    border: 2px solid var(--light-blue);
    color: var(--light);
    background: transparent;
    cursor: pointer;
    transition: all .5s ease;
    &.button-blue {
        border: 2px solid var(--blue);
        color: var(--blue);
    }
    &.button-red {
      border: 2px solid var(--red);
      color: var(--red);
    }
    &:hover {
        background: var(--red);
        border: 2px solid var(--red);
        color: white;
    }
    &:focus {
        outline: none;
    }
`
