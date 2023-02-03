import { ComponentType } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from "react-toastify";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    roles?: string[];
}

export function PrivateRoute({ component: Component, roles, ...rest }: Props) {
    const {user} = useAppSelector(state => state.account);
    return (
      <Route {...rest} render={props => {
          if (!user) {
            return <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
          }

          if (roles && !roles?.some(r => user.roles?.includes(r))) {
            toast.error('Not authorized to access this area');
            return <Redirect to={{ pathname: "/catalog", state: { from: props.location }}}/>
          }
          return <Component {...props} />
        }}
      />
    );
  }