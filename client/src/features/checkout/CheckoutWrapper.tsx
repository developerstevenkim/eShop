import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe("pk_test_51MUGY2J3cXsmcHgKknqa8xQXYQ8XnIqLjw7MAy3obZIm9wRgLr4RviI4N3oEfdXx4EaTA1hYekpbPVKN41zhPdCh00V9K5nYoo");

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingComponent message="Loading checkout..." />
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}