import home from "../images/home.svg";
import filledHome from "../images/filledHome.svg";
import bag from "../images/bag.svg";
import filledBag from "../images/filledBag.svg";
import heart from "../images/heart.svg";
import filledHeart from "../images/filledHeart.svg";
import help from "../images/help.svg";
import filledHelp from "../images/filledHelp.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../App";
import Swal from "sweetalert2";
 
export default function Footer() {
    const navigate = useNavigate();
    const [user] = useContext(userContext);

    function navigateToCart() {
        if (user === null) {
            Swal.fire({
                'title': 'Antes de acessar o carrinho, crie uma conta',
                'text': 'É fácil, é gratis!',
                "icon": 'error',
                "confirmButtonText": '<i className="fa fa-thumbs-up"></i> Vamos lá!',
                "showCancelButton": true
            }).then(result => {
                if(result.isConfirmed)
                    navigate('/sign-up')
            })
        } else {
            navigate("/cart");
        }
    }

    return (
        <FooterStyles>
            <div>
                <img src={filledHome} alt="Página inicial"/>
            </div>
            <div onClick={navigateToCart}>
                <img src={bag} alt="Carrinho"/>
            </div>
            <div onClick={() => navigate("/support")}>
                <img src={help} alt="Suporte"/>
            </div>
        </FooterStyles>
    );
}

const FooterStyles = styled.footer`
    position: fixed;
    bottom: 10px;
    z-index: 1;
    width: 327px;
    height: 64px;
    border-radius: 40px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    filter: drop-shadow(0 -10px 35px #292526);

    div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #292526;
    }
`;