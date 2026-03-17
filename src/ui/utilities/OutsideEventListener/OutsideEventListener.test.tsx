import React, { act } from "react";
import * as Events from "node:events";
import { fireEvent, render, renderHook } from "@/test";

import {
  OutsideEventListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";

describe("ClickAway Listener", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should render properly", () => {
    const { container } = render(
      <OutsideEventListener onOutsideEvent={() => {}}>
        <div>In spring we awaken</div>
      </OutsideEventListener>,
    );
    expect(container?.firstElementChild?.tagName).toBe("DIV");
  });

  it.each`
    fireEventFn   | expectedEventType
    ${"focusIn"}  | ${"focusin"}
    ${"click"}    | ${"click"}
    ${"touchEnd"} | ${"touchend"}
  `(
    'should return the "$expectedEventType" event object, when the "$fireEventFn" event is fired on the outside element',
    ({ fireEventFn, expectedEventType }) => {
      const handleClick = (event: Events) => {
        expect(event.eventNames()).toBe(expectedEventType);
      };

      const { getByText } = render(
        <React.Fragment>
          <OutsideEventListener
            onOutsideEvent={returnTrueElementOrUndefined(
              !!handleClick,
              handleClick,
            )}
          >
            <div>Flowers grow in the garden</div>
          </OutsideEventListener>
          <button>Gardens are part of a landscape</button>
        </React.Fragment>,
      );

      fireEvent[fireEventFn](getByText(/Gardens are part of a landscape/i));
    },
  );

  it.each`
    mouseEvent     | fireEventFn
    ${"click"}     | ${"click"}
    ${"mousedown"} | ${"mouseDown"}
    ${"mouseup"}   | ${"mouseUp"}
  `(
    'should invoke the provided onOutsideEvent listener, only when the "$fireEventFn" mouse event is fired on the outside elements',
    ({ mouseEvent, fireEventFn }) => {
      const handleOutsideEvent = jest.fn();
      const { getByText } = render(
        <React.Fragment>
          <OutsideEventListener
            onOutsideEvent={handleOutsideEvent}
            mouseEvent={mouseEvent}
          >
            <div>Trees leaf</div>
          </OutsideEventListener>
          <button>The weather warms</button>
          <p>The sun shines</p>
        </React.Fragment>,
      );
      jest.runOnlyPendingTimers();

      fireEvent[fireEventFn](getByText(/The weather warms/i));
      fireEvent[fireEventFn](getByText(/The sun shines/i));
      fireEvent[fireEventFn](getByText(/Trees leaf/i));
      expect(handleOutsideEvent).toHaveBeenCalledTimes(2);
    },
  );

  it.each`
    touchEvent      | fireEventFn
    ${"touchstart"} | ${"touchStart"}
    ${"touchend"}   | ${"touchEnd"}
  `(
    'should invoke the provided onOutsideEvent listener, only when the "$fireEventFn" touch event is fired on the outside elements',
    ({ touchEvent, fireEventFn }) => {
      const handleOutsideEvent = jest.fn();
      const { getByText } = render(
        <React.Fragment>
          <OutsideEventListener
            onOutsideEvent={handleOutsideEvent}
            touchEvent={touchEvent}
          >
            <div>Leaves turn brown</div>
          </OutsideEventListener>
          <button>The harvest ripens</button>
          <p>The acorns fall</p>
        </React.Fragment>,
      );
      jest.runOnlyPendingTimers();

      fireEvent[fireEventFn](getByText(/The harvest ripens/i));
      fireEvent[fireEventFn](getByText(/The acorns fall/i));
      fireEvent[fireEventFn](getByText(/Leaves turn brown/i));
      expect(handleOutsideEvent).toHaveBeenCalledTimes(2);
    },
  );

  it.each`
    focusEvent    | fireEventFn
    ${"focusin"}  | ${"focusIn"}
    ${"focusout"} | ${"focusOut"}
  `(
    'should invoke the provided onOutsideEvent listener, only when the "$fireEventFn" focus event is fired on the outside elements',
    ({ focusEvent, fireEventFn }) => {
      const handleOutsideEvent = jest.fn();
      const { getByText } = render(
        <React.Fragment>
          <OutsideEventListener
            onOutsideEvent={handleOutsideEvent}
            focusEvent={focusEvent}
          >
            <div>Cold strengthens</div>
          </OutsideEventListener>
          <button>Trees are bare</button>
          <p>All Under a blanket of snow</p>
        </React.Fragment>,
      );
      jest.runOnlyPendingTimers();

      fireEvent[fireEventFn](getByText(/Trees are bare/i));
      fireEvent[fireEventFn](getByText(/All Under a blanket of snow/i));
      fireEvent[fireEventFn](getByText(/Cold strengthens/i));
      expect(handleOutsideEvent).toHaveBeenCalledTimes(2);
    },
  );

  it("should handle multiple cases", () => {
    const handleOutsideEvent = jest.fn();
    const handleOutsideEvent2 = jest.fn();
    const { getByTestId } = render(
      <React.Fragment>
        <OutsideEventListener onOutsideEvent={handleOutsideEvent}>
          <div data-testid="hello-world">Hello World</div>
        </OutsideEventListener>
        <button data-testid="button-one">A button</button>
        <button data-testid="some-other-button-one">Some other button</button>
        <p data-testid="text-one">A text element</p>

        <OutsideEventListener onOutsideEvent={handleOutsideEvent2}>
          <div data-testid="foo-bar">Foo bar</div>
        </OutsideEventListener>
        <button data-testid="button-two">Foo bar button</button>
        <button data-testid="some-other-button-two">
          Foo bar other button
        </button>
        <p data-testid="text-two">Foo bar text element</p>
      </React.Fragment>,
    );
    jest.runOnlyPendingTimers();

    fireEvent.click(getByTestId("button-one"));
    fireEvent.click(getByTestId("text-one"));
    fireEvent.click(getByTestId("hello-world"));
    fireEvent.click(getByTestId("some-other-button-one"));
    expect(handleOutsideEvent).toHaveBeenCalledTimes(3);

    // 4 from the previous ones, and the 3 new ones
    fireEvent.click(getByTestId("button-two"));
    fireEvent.click(getByTestId("text-two"));
    fireEvent.click(getByTestId("foo-bar"));
    fireEvent.click(getByTestId("some-other-button-two"));
    expect(handleOutsideEvent2).toHaveBeenCalledTimes(7);
  });

  it("should handle multiple cases", () => {
    const handleOutsideEvent = jest.fn();
    const handleOutsideEvent2 = jest.fn();
    const { getByTestId } = render(
      <React.Fragment>
        <OutsideEventListener onOutsideEvent={handleOutsideEvent}>
          <div data-testid="hello-world">Hello World</div>
        </OutsideEventListener>
        <button data-testid="button-one">A button</button>
        <button data-testid="some-other-button-one">Some other button</button>
        <p data-testid="text-one">A text element</p>

        <OutsideEventListener onOutsideEvent={handleOutsideEvent2}>
          <div data-testid="foo-bar">Foo bar</div>
        </OutsideEventListener>
        <button data-testid="button-two">Foo bar button</button>
        <button data-testid="some-other-button-two">
          Foo bar other button
        </button>
        <p data-testid="text-two">Foo bar text element</p>
      </React.Fragment>,
    );
    jest.runOnlyPendingTimers();

    fireEvent.click(getByTestId("button-one"));
    fireEvent.click(getByTestId("text-one"));
    fireEvent.click(getByTestId("hello-world"));
    fireEvent.click(getByTestId("some-other-button-one"));
    expect(handleOutsideEvent).toHaveBeenCalledTimes(3);

    // 4 from the previous ones, and the 3 new ones
    fireEvent.click(getByTestId("button-two"));
    fireEvent.click(getByTestId("text-two"));
    fireEvent.click(getByTestId("foo-bar"));
    fireEvent.click(getByTestId("some-other-button-two"));
    expect(handleOutsideEvent2).toHaveBeenCalledTimes(7);
  });
  const Input = React.forwardRef<HTMLInputElement>((props, ref) => {
    return <input type="text" {...props} ref={ref} />;
  });
  Input.displayName = "Input";

  it("shouldn’t replace previously added refs", () => {
    const { result } = renderHook(() => {
      const ref = React.useRef({});

      const setRef = (v) => {
        ref.current = v;
      };

      return { ref, setRef };
    });

    const inputRef = React.createRef<HTMLInputElement>();
    const handleOutsideEvent = jest.fn();

    const { getByText } = render(
      <React.Fragment>
        <OutsideEventListener onOutsideEvent={handleOutsideEvent}>
          <Input ref={inputRef} />
        </OutsideEventListener>
        <button>A button</button>
        <p>A text element</p>
      </React.Fragment>,
    );
    jest.runOnlyPendingTimers();

    act(() => {
      result.current.setRef(inputRef.current);
    });

    fireEvent.click(getByText(/A button/i));
    fireEvent.click(getByText(/A text element/i));
    expect(handleOutsideEvent).toHaveBeenCalledTimes(2);
    expect(result.current.ref).toStrictEqual(inputRef);
  });

  it("shouldn’t hijack the onClick listener", () => {
    const handleClick = jest.fn();
    const handleOutsideEvent = jest.fn();

    const { getByText } = render(
      <React.Fragment>
        <OutsideEventListener onOutsideEvent={handleOutsideEvent}>
          <button onClick={handleClick}>Hello World</button>
        </OutsideEventListener>
        <div>The new boston</div>
      </React.Fragment>,
    );
    jest.runOnlyPendingTimers();

    fireEvent.click(getByText("Hello World"));
    fireEvent.click(getByText("The new boston"));
    expect(handleOutsideEvent).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
