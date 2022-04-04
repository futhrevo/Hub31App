import { useRef, useEffect } from 'react';

function createRootElement(id) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function addRootElement(rootElem) {
  document.body.appendChild(rootElem);
}

function usePortal() {
  const rootElemRef = useRef(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector('#rcw-image-preview');
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement('#rcw-image-preview');

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    if (rootElemRef.current) {
      parentElem.appendChild(rootElemRef.current);
    }

    return function removeElement() {
      if (rootElemRef.current) {
        rootElemRef.current.remove();
      }
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, []);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
