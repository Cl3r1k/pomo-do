export const WORK_DAYS = {
  daysInWeek: 7,
  daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekDaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  START_X_COORDINATE: 90,  // In Pixels
  START_Y_COORDINATE: 90,  // In Pixels
  RADIUS_VALUE: 80,  // In Pixels
  CHART_PART_OFFSET_VALUE: 10,  // In Pixels
  CHART_TEXT_OFFSET_VALUE: 40,  // In Pixels
  ANGLE_SINGLE_PERCENT: 360 / 100,
  EMPTY_DATA_MESSAGE: 'No data',
};

export const START_DAY_TIME = [0, 0, 0, 0];
export const END_DAY_TIME = [23, 59, 59, 0];
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
export const EFFECTIVE_POMO_PERCENT = 90;

export const CANVAS_SETTINGS = {
  CANVAS_SIZE: 180,
  CANVAS_CLOCK_STROKE_COLOR: '#cccccc',
  TRIANGLE_COLOR: 'rgba(38, 86, 146, 0.15)',
  CENTER_POINT: 180 / 2,
  CIRCLE_RADIUS: 180 * 0.35,
  MARK_START: 180 * 0.38,
  MARK_LENGTH: 4,
  MARK_ANGLE: 360 / HOURS_IN_DAY,
  TRIANGLE_RADIUS: 180 * 0.34,
  TOTAL_ANGLE: 360,
  ANGLE_CORRECTION: 90,
  COORDINATE_ROUNDING: 10000,
};

