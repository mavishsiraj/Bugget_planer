import * as React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = React.forwardRef(
    ({ activeClassName, pendingClassName, className, ...props }, ref) => {
        return (
            <RouterNavLink
                ref={ref}
                className={({ isActive, isPending }) =>
                    [
                        className,
                        isActive ? activeClassName : "",
                        isPending ? pendingClassName : "",
                    ]
                        .filter(Boolean)
                        .join(" ")
                }
                {...props}
            />
        );
    }
);

NavLink.displayName = "NavLink";

export { NavLink };
