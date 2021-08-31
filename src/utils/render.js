import Abstract from '../view/abstract.js';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND:  'beforeend',
};

const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const replaceElement = (newChild, oldChild) => {
  let oldChildElem;
  let newChildElem;

  if (oldChild instanceof Abstract) {
    oldChildElem = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChildElem = newChild.getElement();
  }

  const parent = oldChildElem.parentElement;

  console.log(
    {
      'oldChildElem': oldChildElem,
      'newChildElem': newChildElem,
      'parent': parent,
    }
  );

  if (parent === null || oldChildElem === null || newChildElem === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChildElem, oldChildElem);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export { RenderPosition, render, createElement, replaceElement, removeElement };
