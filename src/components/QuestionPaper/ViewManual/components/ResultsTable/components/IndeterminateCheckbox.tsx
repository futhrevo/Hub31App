import React, { Ref } from 'react';

interface RefObject {
  indeterminate: boolean
}

interface IndeterminateCheckboxType {
  indeterminate: boolean;
  checked: boolean;
  title: string;
}

export const IndeterminateCheckbox = React.forwardRef((props: IndeterminateCheckboxType, ref: Ref<RefObject>) => {
  const { indeterminate, ...rest } = props;
  const defaultRef = React.useRef<RefObject>();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
}
);
