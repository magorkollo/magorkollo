export const WORKSHOP = {
  eyebrow: 'Workshop',
  title: 'IoT in Practice: Microcontroller Control of Smart Homes and Robots',
  subtitle:
    'Write the client code for the central controller and bring smart homes, robotic cars and robotic arms to life over radio.',
  meta: ['50 minutes', 'Hands-on', 'micro:bit V2', 'Teams of 3–4'],
  description: [
    'How can a smart home, a robotic car, or a robotic arm be controlled wirelessly? In this 50-minute hands-on workshop, participants will get direct, accessible experience with how wireless IoT networks operate. Pre-built and pre-programmed hardware peripherals — including smart home models and robotic cars — will be ready for the teams on site. The participants’ task will be to write the client code for the central controller, bringing the various devices to life via radio communication.',
    'Beyond hands-on coding, we will explore how modern wireless integrations are structured in everyday IoT solutions. Finally, we will take a forward-looking look at how artificial intelligence is transforming the future of embedded systems, autonomous robotics, and intelligent hardware.',
  ],
}

export const SPEAKER = {
  name: 'Magor Köllő',
  bio: 'Software Engineer and Team Lead specializing in the development of performance-critical connectivity systems for global financial exchanges. Experienced in bridging high-frequency trading (HFT) architectures with autonomous generative AI systems to automate software control workflows. Alongside his professional work, he is deeply dedicated to community building and STEM education, actively leading a youth NGO to empower and train the next generation.',
  roles: [
    'Software Engineer',
    'HFT Specialist',
    'AI Engineer',
    'NGO Leader',
    'STEM Educator',
  ],
}

export interface BuildItem {
  icon: 'home' | 'car' | 'arm'
  title: string
  description: string
}

export const BUILDS: BuildItem[] = [
  {
    icon: 'home',
    title: 'Smart home model',
    description:
      'A miniature smart home with wirelessly addressable lighting and digital I/O peripherals.',
  },
  {
    icon: 'car',
    title: 'Robotic car',
    description:
      'A two-wheeled robotic buggy steered wirelessly via accelerometer tilt data and equipped with ultrasonic telemetry.',
  },
  {
    icon: 'arm',
    title: 'Robotic arm',
    description:
      'A multi-axis servo-driven robotic arm responding to positional commands sent across radio channels.',
  },
]

export interface AgendaItem {
  marker: string
  text: string
}

export const AGENDA: AgendaItem[] = [
  { marker: '0–5 min', text: 'Introduction & hardware tour' },
  { marker: '5–10 min', text: 'Radio basics & team pairing' },
  { marker: '10–20 min', text: 'Task 1: Getting on the air' },
  { marker: '20–35 min', text: 'Tasks 2–3: Actuator control & tilt steering' },
  {
    marker: '35–45 min',
    text: 'Task 4 & bonus: Telemetry feedback & robotic arm',
  },
  { marker: '45–50 min', text: 'Production IoT architecture & AI outlook' },
]

export const SETUP_STEPS = [
  'Open Microsoft MakeCode for micro:bit in your browser.',
  'Create a new project for your controller.',
  'Switch from Blocks to the JavaScript tab at the top of the editor.',
  "Set your team's assigned radio group number in code.",
]

export interface SetupField {
  label: string
  value: string
  href?: string
}

export const SETUP_FIELDS: SetupField[] = [
  {
    label: 'Editor',
    value: 'makecode.microbit.org',
    href: 'https://makecode.microbit.org/',
  },
  {
    label: 'Radio group',
    value: '7',
  },
  {
    label: 'Docs — radio',
    value: 'makecode.microbit.org/reference/radio',
    href: 'https://makecode.microbit.org/reference/radio',
  },
]

export type TaskId = 'task-1' | 'task-2' | 'task-3' | 'task-4' | 'bonus'

export interface TaskItem {
  id: TaskId
  title: string
  goal: string
  code: string
  expected: string
}

export const TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Task 1: Join the network',
    goal: 'Get on the air and prove the link works between your controller and the network.',
    code: `radio.setGroup(7)
radio.setTransmitPower(7)

input.onButtonPressed(Button.A, function () {
    radio.sendString("hello")
    basic.showIcon(IconNames.Happy)
})`,
    expected:
      'Pressing button A broadcasts a greeting packet over radio and displays a happy face on your micro:bit.',
  },
  {
    id: 'task-2',
    title: 'Task 2: Switch the lights',
    goal: 'Send a named value the smart home node already listens for to toggle lighting.',
    code: `radio.setGroup(7)

input.onButtonPressed(Button.A, function () {
    radio.sendValue("light", 1)
    basic.showString("ON")
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue("light", 0)
    basic.showString("OFF")
})`,
    expected:
      'Pressing button A turns on the smart home lamp, while pressing button B switches it off.',
  },
  {
    id: 'task-3',
    title: 'Task 3: Drive the car by tilting',
    goal: "Stream the controller's accelerometer tilt values to steer and drive the robotic car.",
    code: `radio.setGroup(7)

basic.forever(function () {
    let x = input.acceleration(Dimension.X)
    let y = input.acceleration(Dimension.Y)
    radio.sendValue("x", x)
    radio.sendValue("y", y)
    basic.pause(100)
})`,
    expected:
      'Tilting your micro:bit continuously streams steering vectors that propel and turn the robotic car.',
  },
  {
    id: 'task-4',
    title: 'Task 4: Read the telemetry coming back',
    goal: 'The peripheral talks back; receive distance sensor telemetry and alert on obstacles.',
    code: `radio.setGroup(7)

radio.onReceivedValue(function (name, value) {
    if (name == "dist") {
        if (value < 15) {
            basic.showIcon(IconNames.No)
        } else {
            basic.showIcon(IconNames.Yes)
        }
    }
})`,
    expected:
      'The micro:bit receives ultrasonic distance readings and displays an alert icon if an obstacle is within 15 cm.',
  },
  {
    id: 'bonus',
    title: 'Bonus: Move the robotic arm',
    goal: 'Maintain servo position state on the central controller and nudge the arm incrementally.',
    code: `radio.setGroup(7)
let angle = 90

input.onButtonPressed(Button.A, function () {
    angle = Math.max(0, angle - 15)
    radio.sendValue("arm", angle)
})

input.onButtonPressed(Button.B, function () {
    angle = Math.min(180, angle + 15)
    radio.sendValue("arm", angle)
})

input.onGesture(Gesture.Shake, function () {
    angle = 90
    radio.sendValue("arm", angle)
})`,
    expected:
      'Buttons A and B adjust the servo angle in 15-degree steps, and shaking the controller centers it at 90 degrees.',
  },
]

export interface ProtocolItem {
  name: string
  value: string
  meaning: string
}

export const PROTOCOL: ProtocolItem[] = [
  {
    name: 'light',
    value: '0 or 1',
    meaning: 'Turn the smart home lamp off (0) or on (1).',
  },
  {
    name: 'x, y',
    value: '-1023…1023',
    meaning: "Steering axes streamed from the controller's accelerometer.",
  },
  {
    name: 'arm',
    value: '0…180',
    meaning: 'Target servo angle for the robotic arm in degrees.',
  },
  {
    name: 'dist',
    value: 'cm',
    meaning: "Distance reading sent back by the car's ultrasonic sensor.",
  },
]

export const RECEIVER_CODE = `radio.setGroup(7)

radio.onReceivedValue(function (name, value) {
    if (name == "light") {
        pins.digitalWritePin(DigitalPin.P0, value)
    } else if (name == "arm") {
        pins.servoWritePin(AnalogPin.P1, value)
    }
})`

export interface GalleryItem {
  src: string | null
  file: string
  alt: string
  caption: string
}

// Placeholders until the real photos exist. To swap one in: save the photo as
// public/deepdive/<file> and set `src` to '/deepdive/<file>' on that entry —
// the dashed placeholder frame is replaced by the image automatically.
export const GALLERY: GalleryItem[] = [
  {
    src: null,
    file: 'smart-home.jpg',
    alt: 'Smart home model',
    caption:
      'The smart home model with wirelessly addressable lighting and digital I/O peripherals.',
  },
  {
    src: null,
    file: 'robot-car.jpg',
    alt: 'Robotic car',
    caption:
      'The robotic car featuring micro:bit radio steering and distance telemetry.',
  },
  {
    src: null,
    file: 'robot-arm.jpg',
    alt: 'Robotic arm',
    caption:
      'The multi-axis servo-driven robotic arm responding to radio position commands.',
  },
  {
    src: null,
    file: 'team.jpg',
    alt: 'Team at work',
    caption:
      'A workshop team collaborating on controller code and live hardware integration.',
  },
]

export const ARCHITECTURE_CHAIN = [
  'Sensor / Actuator',
  'Microcontroller',
  'Radio link',
  'Gateway',
  'Broker (MQTT)',
  'Cloud API',
  'App',
]

export const ARCHITECTURE_NOTES = [
  'In this workshop, the direct 2.4 GHz radio link between micro:bits mirrors the local peripheral layer of an IoT architecture — coupling sensors and actuators to a nearby embedded controller with minimal latency and zero configuration overhead.',
  'Real-world industrial and consumer IoT stacks build upon this foundation by adding structured device addressing, delivery guarantees and retries, cryptographic device identity and mutual TLS authentication, robust message brokers, and secure over-the-air (OTA) firmware update pipelines.',
]

export interface AiOutlookItem {
  title: string
  text: string
}

export const AI_OUTLOOK: AiOutlookItem[] = [
  {
    title: 'On-Device Inference & TinyML',
    text: 'Quantized neural networks running directly on microcontrollers enable real-time gesture recognition and acoustic anomaly detection with micro-watt power budgets.',
  },
  {
    title: 'Natural Language Hardware Control',
    text: 'Autonomous LLM agents bridge human intent and physical devices, converting conversational instructions into typed remote procedure calls and radio payloads.',
  },
  {
    title: 'Autonomous Closed-Loop Robotics',
    text: 'End-to-end vision-language-action models process real-time sensor streams to let robots navigate environments and manipulate objects without brittle rule sets.',
  },
]

export interface ResourceItem {
  label: string
  href: string
  description: string
}

export const RESOURCES: ResourceItem[] = [
  {
    label: 'Microsoft MakeCode for micro:bit',
    href: 'https://makecode.microbit.org/',
    description:
      'Browser-based block and JavaScript editor for programming the micro:bit.',
  },
  {
    label: 'micro:bit Radio Reference',
    href: 'https://makecode.microbit.org/reference/radio',
    description:
      'Complete documentation for the micro:bit packet radio protocol and APIs.',
  },
  {
    label: 'micro:bit Educational Foundation',
    href: 'https://microbit.org/',
    description:
      'Official hardware specifications, safety guides, and teaching projects.',
  },
  {
    label: 'micro:bit Python Editor',
    href: 'https://python.microbit.org/',
    description:
      'The Foundation’s MicroPython editor — the text-based alternative to MakeCode.',
  },
]
