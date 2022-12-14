import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userContext } from "./App";
import API_BASE_URL from "./assets/constants";
import back from "./images/back.svg";
import boldMinus from "./images/boldMinus.svg";
import boldPlus from "./images/boldPlus.svg";
import remove from "./images/remove.svg";

export default function CartPage({selectedProducts, setSelectedProducts, totalPrice, setTotalPrice}) {
    const navigate = useNavigate();
    const [user] = useContext(userContext);
    const [refresh, setRefresh] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [disabled, setDisabled] = useState(false);

    function RequestCart() {
        const config = {headers: {"Authorization": "Bearer " + user.sessionId}};
        
        axios.get(API_BASE_URL + "/cart", config)
            .then(({data}) => setSelectedProducts(data));
    }

    useEffect(RequestCart, [refresh]);

    function Item({product}) {
        const {image, name, rate, color, size, price, _id, amount} = product;

        return (
            <>
                <div></div>
                <section>
                    <img src={image} alt=""/>
                    <div>
                        <p>{name}</p>
                        <span>Avaliação: {rate}/5</span>
                        <span>Cor: {color} </span>
                        <span>Tamanho: {size} </span>
                        <span>R${Number(price).toFixed(2)}</span>
                    </div>
                    <div>
                        <img onClick={() => deleteProduct(product, _id)} src={remove} alt=""/>
                        <div>
                            <img onClick={() => handleAmount(-1, product, amount)} src={boldMinus} alt="Adicionar uma unidade"/>
                            <span>{amount}</span>
                            <img onClick={() => handleAmount(1, product, amount)} src={boldPlus} alt="Retirar uma unidade"/>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    function handleAmount(quantity, product, currentAmount) {
        if (disabled === false) {
            if (Number(currentAmount) + quantity === 0) return;

            setDisabled(true);
            const sentableProduct = {
                "amount": quantity,
                "color": product.color,
                "size": product.size
            };

            const config = {headers: {"Authorization": "Bearer " + user.sessionId}};
            axios.post(API_BASE_URL + `/products/${product._id}`, sentableProduct, config)
                .then(() => {setRefresh(!refresh); setDisabled(false)});
        }
    }

    function deleteProduct(product, _id) {
        if (disabled === false) {
            setDisabled(true);
            const sentableProduct = {
                "amount": 0,
                "color": product.color,
                "size": product.size
            };
            const config = {headers: {"Authorization": "Bearer " + user.sessionId}, data: sentableProduct};
    
            axios.delete(API_BASE_URL + `/products/${_id}`, config)
                .then(() => {setRefresh(!refresh); setDisabled(false)});
        }
    }

    function countQuantityAndTotal() {
        let sumAmount = 0;
        let sumPrice = 0;

        for (const product of selectedProducts) {
            const {amount, price} = product;

            sumAmount += Number(amount);
            sumPrice += Number(price);
        }

        setTotalAmount(sumAmount);
        setTotalPrice(sumPrice.toFixed(2));
    }

    useEffect(countQuantityAndTotal, [selectedProducts]);

    return (
        <CartStyles totalAmount={totalAmount}>
            <header>
                <div onClick={() => navigate("/")}>
                    <img src={back} alt=""/>
                </div>
                <h1>Carrinho</h1>
            </header>
            <main>
                <div>
                    {selectedProducts.map((product, index) => <Item product={product} key={index}/>)}
                </div>
            </main>
            <footer onClick={() => navigate("/checkout")}>
                Pagar | ({totalAmount} ite{totalAmount > 1 ? "ns" : "m"}) R${totalPrice}
            </footer>
        </CartStyles>
    );
}

const CartStyles = styled.div`
    display: flex;
    justify-content: center;

    header {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 327px;
        height: 64px;
        border-bottom: 1px solid #EDEDED;
        display: flex;
        align-items: center;
        column-gap: 88.5px;
        background-color: #FFFFFF;

        div {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #292526;
        }

        h1 {
            font-family: "Encode Sans", sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            color: #1B2028;
        }
    }

    main {
        margin-top: 64px;
        height: calc(100vh - 64px);
        overflow: hidden;
        overflow-y: auto;

        &>div {
            padding-bottom: 84px;
            display: flex;
            flex-direction: column;
            align-items: center;

            &>div {
                width: 327px;
                height: 1.5px;
                background-color: #EDEDED;
            }

            &>section {
                width: 100%;
                height: 118px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                &>img {
                    width: 70px;
                    height: 70px;
                    border-radius: 14px;
                    object-fit: cover;
                }

                &>div:nth-of-type(1) {
                    margin-left: 15px;
                    margin-right: auto;
                    width: 135px;
                    height: 66px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    p {
                        width: 150px;
                        font-family: "Encode Sans", sans-serif;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 18px;
                        color: #1B2028;
                    }

                    span:nth-of-type(1n) {
                        margin-top: 4px;
                        margin-bottom: auto;
                        font-family: "Encode Sans", sans-serif;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 12px;
                        color: #A4AAAD;
                    }

                    span:nth-of-type(4) {
                        font-family: "Encode Sans", sans-serif;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 18px;
                        color: #1B2028;
                    }
                }

                &>div:nth-of-type(2) {
                    height: 70px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-end;

                    &>img {
                        width: 20px;
                        height: 20px;
                    }

                    &>div {
                        width: 85px;
                        padding: 4px 6px;
                        display: flex;
                        justify-content: space-between;
                        border-radius: 8px;
                        background-color: #1B2028;

                        span {
                            font-family: "Encode Sans", sans-serif;
                            font-weight: 600;
                            font-size: 14px;
                            line-height: 20px;
                            color: #FFFFFF;
                        }
                    }
                }
            }
        }
    }

    footer {
        position: fixed;
        bottom: 10px;
        z-index: 1;
        width: 327px;
        height: 64px;
        border-radius: 40px;
        display: ${({totalAmount}) => totalAmount > 0 ? "flex" : "none"};
        justify-content: center;
        align-items: center;
        background-color: #292526;
        font-family: "Encode Sans", sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;