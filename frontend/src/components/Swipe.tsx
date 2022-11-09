import Hammer from "react-hammerjs-18";
import { TIME_TO_NEXT_CARD } from "../constants/swipe";

function handlePan(event: any) {
  if (event.deltaX === 0) return;
  if (event.center.x === 0 && event.center.y === 0) return;

  var xMulti = event.deltaX * 0.03;
  var yMulti = event.deltaY / 80;
  var rotate = xMulti * yMulti;

  event.target.style.transform =
    "translate(" +
    event.deltaX +
    "px, " +
    event.deltaY +
    "px) rotate(" +
    rotate +
    "deg)";
}

const handlePanEnd =
  ({ left, right }: { left: () => void; right: () => void }) =>
  (event: any) => {
    const moveOutWidth = document.body.clientWidth;
    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    if (keep) {
      event.target.style.transform = "";
    } else {
      const endX = Math.max(
        Math.abs(event.velocityX) * moveOutWidth,
        moveOutWidth
      );
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;
      event.target.style.transform =
        "translate(" +
        toX +
        "px, " +
        (toY + event.deltaY) +
        "px) rotate(" +
        rotate +
        "deg)";

      if (event.direction === 2) {
        left();
      } else if (event.direction === 4) {
        right();
      }

      setTimeout(() => {
        event.target.style.transition = "none";
        event.target.style.transform = "";
      }, TIME_TO_NEXT_CARD);
    }
  };

type SwipeProps = {
  children: JSX.Element;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const Swipe: React.FunctionComponent<SwipeProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}) => (
  <Hammer
    onPan={handlePan}
    onPanEnd={handlePanEnd({ left: onSwipeLeft, right: onSwipeRight })}
  >
    {children}
  </Hammer>
);

export default Swipe;
