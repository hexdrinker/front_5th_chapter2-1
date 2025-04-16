export function createComponent(options = {}) {
  const { name, render, onMount, onUpdate, onUnmount, defaultProps, defaultState } = options;

  return (props = {}) => {
    let container = null;
    let currentState = { ...defaultState };
    let currentProps = { ...defaultProps, ...props };
    const children = {};

    const generateHTML = () =>
      render({
        ...currentProps,
        ...currentState,
        children,
      });

    return {
      html: generateHTML(),

      mount: target => {
        container = target;
        container.innerHTML = generateHTML();
        console.log(`${name} is mounted.`);
        onMount?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });
      },

      update: newProps => {
        currentProps = { ...currentProps, ...newProps };
        const newHTML = generateHTML();
        container.innerHTML = newHTML;

        onMount?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });

        onUpdate?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });
      },

      unmount: () => {
        // 자식부터 unmount
        Object.values(children).forEach(child => {
          if (child && child.unmount && typeof child.unmount === 'function') {
            child.unmount();
          }
        });
        console.log(`${name} is unmounted.`);
        onUnmount?.(container, {
          ...currentProps,
          ...currentState,
          children,
        });
        // state 초기화
        currentState = { ...defaultState };
      },
    };
  };
}
