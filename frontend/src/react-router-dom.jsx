import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext();
const RouteMatchContext = createContext({ params: {}, outlet: null });

export const BrowserRouter = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setPath(to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const value = useMemo(() => ({ path, navigate }), [path]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

const splitPath = (path) => path.replace(/(^\/+|\/$)/g, '').split('/').filter(Boolean);

const matchRoute = (route, segments, baseParams = {}) => {
  const routePath = route.props.path ?? '';
  const routeSegments = routePath === '' ? [] : splitPath(routePath);
  if (routeSegments.length > segments.length) return null;

  const params = { ...baseParams };
  for (let i = 0; i < routeSegments.length; i += 1) {
    const part = routeSegments[i];
    const current = segments[i];
    if (part.startsWith(':')) {
      params[part.slice(1)] = decodeURIComponent(current);
    } else if (part !== current) {
      return null;
    }
  }

  const remaining = segments.slice(routeSegments.length);
  const children = React.Children.toArray(route.props.children || []);

  for (const child of children) {
    if (child.type !== Route) continue;
    const childMatch = matchRoute(child, remaining, params);
    if (childMatch) {
      const element = (
        <RouteMatchContext.Provider value={{ params: childMatch.params, outlet: childMatch.element }}>
          {route.props.element || null}
        </RouteMatchContext.Provider>
      );
      return { element, params: childMatch.params, consumed: segments.length - remaining.length };
    }
  }

  if (remaining.length === 0) {
    const mergedParams = { ...params };
    return {
      element: (
        <RouteMatchContext.Provider value={{ params: mergedParams, outlet: null }}>
          {route.props.element || null}
        </RouteMatchContext.Provider>
      ),
      params: mergedParams,
      consumed: segments.length,
    };
  }

  return null;
};

export const Routes = ({ children }) => {
  const { path } = useContext(RouterContext);
  const segments = splitPath(path);
  const routes = React.Children.toArray(children);

  for (const child of routes) {
    if (child.type !== Route) continue;
    const match = matchRoute(child, segments);
    if (match) return match.element;
  }
  return null;
};

export const Route = () => null;

export const Navigate = ({ to, replace = false }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [to, replace]);
  return null;
};

export const Link = ({ to, children, ...rest }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export const Outlet = () => {
  const { outlet } = useContext(RouteMatchContext);
  return outlet || null;
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};

export const useParams = () => {
  const { params } = useContext(RouteMatchContext);
  return params || {};
};

export const useLocation = () => {
  const { path } = useContext(RouterContext);
  return { pathname: path };
};
