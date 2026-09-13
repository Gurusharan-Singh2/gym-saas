// Comprehensive Day-Wise 2-Muscle Split Workout & Exercise Database
// 7 Days, each day exactly 2 targeted muscle groups, each muscle with 3 difficulty tiers: Beginner, Intermediate, Hard.

export const WORKOUT_SPLIT = [
  {
    day: 'Monday',
    dayNumber: 1,
    title: 'Chest & Triceps Hypertrophy',
    focus: 'Push Power & Upper Torso Architecture',
    muscles: [
      {
        id: 'chest',
        name: 'Chest',
        scientificName: 'Pectoralis Major & Minor',
        description: 'Upper, mid, and lower pectoral fibers responsible for pushing movements, shoulder adduction, and horizontal flexion.',
        exercises: [
          {
            id: 'incline-pushup',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0493-B1EVP9F.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0493-B1EVP9F.jpg',
            name: 'Incline Push-Ups',
            difficulty: 'Beginner',
            animationType: 'pushup',
            muscle: 'Chest',
            secondaryMuscles: ['Front Deltoids', 'Triceps', 'Core'],
            equipment: 'Bench / Sturdy Elevation',
            setsReps: '3 sets × 12-15 reps',
            restSeconds: 60,
            tempo: '2-1-2-1',
            setup: [
              'Place hands shoulder-width apart on an elevated bench or sturdy platform.',
              'Step feet back until your body forms a straight rigid line from heels to crown.',
              'Engage glutes and brace your core tightly.'
            ],
            execution: [
              'Inhale as you lower your chest smoothly until it hovers an inch above the bench.',
              'Keep elbows tucked at roughly 45 degrees, avoiding excessive flare.',
              'Exhale as you press firmly through the palms to lock out your arms at the top.'
            ],
            proTip: 'Focus on squeezing your inner chest together as if trying to slide your hands toward each other at peak contraction.',
            commonMistake: 'Sagging hips or arching the lower back. Maintain a strict neutral spine throughout the full range.'
          },
          {
            id: 'flat-dumbbell-press',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0289-SpYC0Kp.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0289-SpYC0Kp.jpg',
            name: 'Flat Dumbbell Bench Press',
            difficulty: 'Intermediate',
            animationType: 'dumbbell_press',
            muscle: 'Chest',
            secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
            equipment: 'Flat Bench & Dumbbells',
            setsReps: '4 sets × 8-10 reps',
            restSeconds: 90,
            tempo: '3-0-1-1',
            setup: [
              'Sit on the bench holding dumbbells on your thighs.',
              'Kick back carefully and lie flat with feet planted firmly on the floor.',
              'Retract and depress your scapulae into the bench cushion.'
            ],
            execution: [
              'Lower the dumbbells outward and down along the mid-chest line with a 3-second eccentric tempo.',
              'Feel a deep, controlled stretch across the pectorals at the bottom.',
              'Press smoothly upward along a slight inward arc without clanging the dumbbells together at the peak.'
            ],
            proTip: 'Dumbbells permit a deeper stretch and natural wrist rotation than a fixed barbell. Exploit that range of motion.',
            commonMistake: 'Bouncing at the bottom or flaring elbows out at 90 degrees, which places excessive shear stress on the rotator cuff.'
          },
          {
            id: 'barbell-bench-press',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0025-EIeI8Vf.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg',
            name: 'Barbell Bench Press',
            difficulty: 'Hard',
            animationType: 'bench_press',
            muscle: 'Chest',
            secondaryMuscles: ['Triceps', 'Front Delts', 'Lats (Stabilizers)'],
            equipment: 'Olympic Barbell & Bench Station',
            setsReps: '5 sets × 5 reps (Heavy Power)',
            restSeconds: 120,
            tempo: '2-1-1-0',
            setup: [
              'Lie flat with eyes directly aligned underneath the racked barbell.',
              'Grip the bar slightly wider than shoulder width with a full thumb-wrapped grip.',
              'Create full-body tension: plant feet, squeeze glutes, arch upper back, and pinch shoulder blades.'
            ],
            execution: [
              'Unrack the bar and hold it directly over your sternum with locked arms.',
              'Lower the bar with strict control until it lightly touches your lower sternum/nipple line.',
              'Drive heels hard into the floor (leg drive) and press explosively back to starting position.'
            ],
            proTip: 'Bend the bar in your hands as you press. This cues external shoulder rotation and anchors the lats as a solid pressing shelf.',
            commonMistake: 'Allowing wrists to bend backward under heavy load. Keep wrists stacked vertically above the forearms.'
          }
        ]
      },
      {
        id: 'triceps',
        name: 'Triceps',
        scientificName: 'Triceps Brachii (Lateral, Long & Medial Heads)',
        description: 'Makes up two-thirds of upper arm mass, driving elbow extension and pushing lockout strength.',
        exercises: [
          {
            id: 'bench-tricep-dips',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0129-RrLske5.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0129-RrLske5.jpg',
            name: 'Bench Tricep Dips',
            difficulty: 'Beginner',
            animationType: 'dips',
            muscle: 'Triceps',
            secondaryMuscles: ['Front Delts', 'Upper Chest'],
            equipment: 'Gym Bench or Sturdy Box',
            setsReps: '3 sets × 12-15 reps',
            restSeconds: 60,
            tempo: '2-1-2-1',
            setup: [
              'Sit on the edge of a bench with palms gripping the edge next to your hips.',
              'Extend legs forward with knees bent (or legs straight for more resistance).',
              'Slide your hips forward off the bench with chest elevated.'
            ],
            execution: [
              'Slowly lower your torso by bending at the elbows until upper arms are parallel with the floor (90°).',
              'Keep your back close to the bench to avoid shoulder impingement.',
              'Press through palms to fully extend arms and flex the triceps intensely at the top.'
            ],
            proTip: 'Pause for 1 second at the bottom of the dip to eliminate rebound momentum.',
            commonMistake: 'Allowing shoulders to roll forward or shrugging toward the ears.'
          },
          {
            id: 'cable-rope-pushdown',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1723-qRZ5S1N.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1723-qRZ5S1N.jpg',
            name: 'Cable Rope Tricep Pushdowns',
            difficulty: 'Intermediate',
            animationType: 'tricep_pushdown',
            muscle: 'Triceps',
            secondaryMuscles: ['Forearms', 'Anconeus'],
            equipment: 'Cable Machine with Rope Attachment',
            setsReps: '4 sets × 10-12 reps',
            restSeconds: 60,
            tempo: '2-0-1-2',
            setup: [
              'Attach rope to high pulley. Grip rope with neutral hands (palms facing each other).',
              'Hinge slightly forward at hips (15°), keeping chest tall and core braced.',
              'Pin your elbows firmly against the sides of your ribcage.'
            ],
            execution: [
              'Extend elbows downward, driving the rope toward your thighs.',
              'At the bottom, spread the rope ends apart outwards to maximize peak contraction of the lateral head.',
              'Return smoothly to 90 degrees at the elbow without letting the upper arms drift forward.'
            ],
            proTip: 'Only the forearms should move; keep upper arms completely stationary like door hinges.',
            commonMistake: 'Using momentum or leaning heavy body weight into the push.'
          },
          {
            id: 'lying-skull-crusher',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0060-h8LFzo9.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0060-h8LFzo9.jpg',
            name: 'Lying EZ-Bar Skull Crushers',
            difficulty: 'Hard',
            animationType: 'skull_crusher',
            muscle: 'Triceps',
            secondaryMuscles: ['Upper Chest', 'Forearms'],
            equipment: 'EZ Curl Bar & Flat Bench',
            setsReps: '4 sets × 8 reps',
            restSeconds: 90,
            tempo: '3-1-1-1',
            setup: [
              'Lie flat on the bench holding an EZ-bar with an overhand narrow grip on the inner bends.',
              'Extend arms upward with a slight backward tilt (around 75-80 degrees, not perpendicular).',
              'Lock elbows in place.'
            ],
            execution: [
              'Lower the bar slowly toward your crown/forehead by bending only at the elbows.',
              'Feel an intense stretch in the long head of the triceps at the bottom.',
              'Drive the weight back up through elbow extension without letting elbows flare outward.'
            ],
            proTip: 'Angling the upper arms slightly backward keeps constant tension on the long head even at lockout.',
            commonMistake: 'Flaring elbows outward or turning the exercise into a close-grip bench press.'
          }
        ]
      }
    ]
  },
  {
    day: 'Tuesday',
    dayNumber: 2,
    title: 'Back & Biceps Hypertrophy',
    focus: 'Pull Kinetics, Lat Width & Arm Thickness',
    muscles: [
      {
        id: 'back',
        name: 'Back',
        scientificName: 'Latissimus Dorsi, Rhomboids & Mid Traps',
        description: 'V-taper aesthetic foundation, pulling mechanics, and upright postural spinal support.',
        exercises: [
          {
            id: 'lat-pulldown',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2330-LEprlgG.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2330-LEprlgG.jpg',
            name: 'Wide-Grip Lat Pulldown',
            difficulty: 'Beginner',
            animationType: 'lat_pulldown',
            muscle: 'Back',
            secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Brachialis'],
            equipment: 'Cable Lat Pulldown Station',
            setsReps: '3 sets × 12 reps',
            restSeconds: 60,
            tempo: '2-1-2-1',
            setup: [
              'Adjust thigh pad snug against your upper thighs.',
              'Grip wide bar with an overhand grip wider than shoulder-width.',
              'Sit down, arch upper back slightly, and look forward.'
            ],
            execution: [
              'Initiate movement by retracting and depressing your shoulder blades.',
              'Drive elbows down and back toward your hip pockets until bar reaches upper clavicle.',
              'Hold for a count of 1, then slowly let the weight pull your arms back up to a full lat stretch.'
            ],
            proTip: 'Think of your hands as hooks; pull with your elbows, not with your forearm grip.',
            commonMistake: 'Leaning back excessively into a 45-degree angle to heave the weight with body momentum.'
          },
          {
            id: 'bent-over-dumbbell-row',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0292-w9Yv1tQ.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0292-w9Yv1tQ.jpg',
            name: 'Bent-Over Dumbbell Rows',
            difficulty: 'Intermediate',
            animationType: 'barbell_row',
            muscle: 'Back',
            secondaryMuscles: ['Rhomboids', 'Mid Trapezius', 'Biceps', 'Erectors'],
            equipment: 'Pair of Heavy Dumbbells',
            setsReps: '4 sets × 8-10 reps',
            restSeconds: 75,
            tempo: '2-1-1-1',
            setup: [
              'Stand feet hip-width apart holding dumbbells at your sides.',
              'Push hips back into a 45-degree Romanian hinge while keeping a flat spine.',
              'Let dumbbells hang naturally directly below shoulders.'
            ],
            execution: [
              'Pull dumbbells up toward your lower ribs / hips, keeping elbows tucked close to your torso.',
              'Squeeze your shoulder blades together aggressively at peak contraction.',
              'Lower under control to a full stretch without rounding your lower back.'
            ],
            proTip: 'Row toward your hips rather than straight up to your chest for optimal lat activation.',
            commonMistake: 'Jerking the torso up and down to swing heavy weights.'
          },
          {
            id: 'wide-grip-pullups',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0015-vrhHa6D.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0015-vrhHa6D.jpg',
            name: 'Strict Wide-Grip Pull-Ups',
            difficulty: 'Hard',
            animationType: 'pullup',
            muscle: 'Back',
            secondaryMuscles: ['Biceps', 'Posterior Delts', 'Core', 'Forearms'],
            equipment: 'Pull-Up Rig / Bar',
            setsReps: '4 sets × 6-8 strict reps (or weighted)',
            restSeconds: 120,
            tempo: '2-1-1-1',
            setup: [
              'Hang from the bar with an overhand grip wider than shoulders.',
              'Engage active hang: pull shoulders down away from ears and brace core.',
              'Cross ankles or keep legs straight with glutes engaged.'
            ],
            execution: [
              'Pull chest upward toward the bar by driving elbows down into the floor.',
              'Continue pulling until chin clears the bar cleanly.',
              'Pause momentarily at the top, then lower smoothly down to a dead hang.'
            ],
            proTip: 'Do not use kipping or leg swings. Strict dead-stop reps build the densest back musculature.',
            commonMistake: 'Short-changing the bottom stretch by doing half-reps with bent elbows.'
          }
        ]
      },
      {
        id: 'biceps',
        name: 'Biceps',
        scientificName: 'Biceps Brachii & Brachialis',
        description: 'Elbow flexor and forearm supinator, essential for pulling mechanics and peak arm aesthetics.',
        exercises: [
          {
            id: 'standing-dumbbell-curls',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0285-L1626nF.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0285-L1626nF.jpg',
            name: 'Standing Alternating Dumbbell Curls',
            difficulty: 'Beginner',
            animationType: 'bicep_curl',
            muscle: 'Biceps',
            secondaryMuscles: ['Forearms', 'Brachialis'],
            equipment: 'Dumbbells',
            setsReps: '3 sets × 12 reps per arm',
            restSeconds: 60,
            tempo: '2-0-1-1',
            setup: [
              'Stand tall with feet shoulder-width apart, holding dumbbells at sides with neutral palms.',
              'Keep chest high, core braced, and shoulders pinned back.'
            ],
            execution: [
              'Curl one dumbbell up toward your shoulder while supinating (rotating palm upward).',
              'Keep elbow stationary by your ribs; do not swing it forward.',
              'Squeeze the bicep hard at the peak, then lower slowly back to full extension.'
            ],
            proTip: 'Turn your pinky slightly outward at the top of the curl for maximum bicep short-head contraction.',
            commonMistake: 'Rocking torso backward to launch the dumbbell upward.'
          },
          {
            id: 'incline-hammer-curls',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0165-HPlPoQA.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0165-HPlPoQA.jpg',
            name: 'Incline Bench Hammer Curls',
            difficulty: 'Intermediate',
            animationType: 'hammer_curl',
            muscle: 'Biceps',
            secondaryMuscles: ['Brachialis', 'Brachioradialis (Forearm)'],
            equipment: 'Incline Bench (60°) & Dumbbells',
            setsReps: '4 sets × 10 reps',
            restSeconds: 75,
            tempo: '3-0-1-1',
            setup: [
              'Set incline bench to 60 degrees. Sit back with dumbbells hanging straight down.',
              'Keep palms facing each other (neutral grip) throughout the movement.'
            ],
            execution: [
              'Curl dumbbells upward while maintaining the neutral hammer grip.',
              'The incline puts the bicep into a pre-stretched position, firing the brachialis intensely.',
              'Squeeze at the top, then lower with a strict 3-second negative.'
            ],
            proTip: 'Building the brachialis underneath pushes the bicep muscle upward, increasing arm circumference faster.',
            commonMistake: 'Lifting shoulders off the incline bench pad during the curl.'
          },
          {
            id: 'barbell-21s',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0031-6zWdC4p.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0031-6zWdC4p.jpg',
            name: 'Barbell 21s (Burnout Protocol)',
            difficulty: 'Hard',
            animationType: 'bicep_curl',
            muscle: 'Biceps',
            secondaryMuscles: ['Forearms', 'Front Delts'],
            equipment: 'Olympic or EZ Barbell',
            setsReps: '3 rounds × 21 total reps (7 lower + 7 upper + 7 full)',
            restSeconds: 90,
            tempo: 'Continuous Constant Tension',
            setup: [
              'Stand tall holding a loaded barbell with underhand shoulder-width grip.',
              'Shoulders retracted, knees slightly soft, core locked.'
            ],
            execution: [
              'Perform 7 reps from bottom hang to midway (forearms parallel to ground, 90°).',
              'Immediately perform 7 reps from 90° midway up to full peak contraction.',
              'Immediately finish with 7 full-range reps from bottom all the way to top.'
            ],
            proTip: 'Use 60% of your standard barbell curl weight. The metabolic fatigue will be extreme.',
            commonMistake: 'Taking pauses between the 7-rep transitions. Move continuously without rest.'
          }
        ]
      }
    ]
  },
  {
    day: 'Wednesday',
    dayNumber: 3,
    title: 'Shoulders & Trapezius Hypertrophy',
    focus: 'Deltoid Width, 3D Boulder Shoulders & Upper Trap Density',
    muscles: [
      {
        id: 'shoulders',
        name: 'Shoulders',
        scientificName: 'Deltoids (Anterior, Lateral & Posterior Heads)',
        description: 'Defines upper body silhouette, overhead pressing mechanics, and shoulder joint integrity.',
        exercises: [
          {
            id: 'dumbbell-lateral-raise',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0334-93JzGZ5.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0334-93JzGZ5.jpg',
            name: 'Standing Dumbbell Lateral Raises',
            difficulty: 'Beginner',
            animationType: 'lateral_raise',
            muscle: 'Shoulders',
            secondaryMuscles: ['Upper Traps', 'Forearms'],
            equipment: 'Light-to-Moderate Dumbbells',
            setsReps: '3 sets × 15 reps',
            restSeconds: 45,
            tempo: '2-1-1-1',
            setup: [
              'Stand with feet hip-width apart holding dumbbells in front of thighs.',
              'Slight hinge in hips, soft bend in elbows, chest elevated.'
            ],
            execution: [
              'Raise arms outward to the sides along the scapular plane (roughly 15° forward).',
              'Lead with the elbows until hands reach parallel with shoulder height.',
              'Hold for a split second, then lower under strict control.'
            ],
            proTip: 'Pour the water: keep pinkies slightly higher than thumbs to isolate the lateral head and suppress trap takeover.',
            commonMistake: 'Shrugging shoulders upward or swinging hips to throw weights.'
          },
          {
            id: 'seated-dumbbell-press',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0774-jjUPrze.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0774-jjUPrze.jpg',
            name: 'Seated Dumbbell Shoulder Press',
            difficulty: 'Intermediate',
            animationType: 'shoulder_press',
            muscle: 'Shoulders',
            secondaryMuscles: ['Triceps', 'Upper Chest', 'Core'],
            equipment: 'High-Incline / 85° Bench & Dumbbells',
            setsReps: '4 sets × 8-10 reps',
            restSeconds: 75,
            tempo: '2-0-1-1',
            setup: [
              'Sit on bench with back firmly supported at roughly 80-85 degrees.',
              'Kick dumbbells up to shoulder height, elbows angled 45 degrees forward.'
            ],
            execution: [
              'Press dumbbells upward until arms are extended overhead.',
              'Bring weights gently inward at the apex without banging them together.',
              'Lower smoothly back to ear/clavicle level for full deltoid stretch.'
            ],
            proTip: 'Seated position removes leg assistance, isolating deltoids and triceps with pure mechanical tension.',
            commonMistake: 'Excessively arching the lower back to turn the lift into an incline chest press.'
          },
          {
            id: 'standing-military-press',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0086-ngPpyRS.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0086-ngPpyRS.jpg',
            name: 'Standing Barbell Overhead Military Press',
            difficulty: 'Hard',
            animationType: 'shoulder_press',
            muscle: 'Shoulders',
            secondaryMuscles: ['Triceps', 'Upper Traps', 'Abdominals', 'Glutes'],
            equipment: 'Barbell & Squat / Power Rack',
            setsReps: '5 sets × 5 reps',
            restSeconds: 120,
            tempo: '2-1-1-0',
            setup: [
              'Unrack barbell at collarbone height with hands slightly wider than shoulders.',
              'Feet shoulder-width apart, squeeze glutes, brace abs, and tighten quads.'
            ],
            execution: [
              'Pull chin back slightly and press the bar vertically in a straight path.',
              'Once the bar clears your forehead, push head through window under the bar.',
              'Lock bar directly over mid-foot and cervical spine, then return under control.'
            ],
            proTip: 'Full-body kinetic chain transfer: the harder you squeeze glutes and abs, the more force transmits into the bar.',
            commonMistake: 'Leaning backward excessively at the lumbar spine instead of bracing thoracic posture.'
          }
        ]
      },
      {
        id: 'traps',
        name: 'Traps',
        scientificName: 'Trapezius (Upper, Middle & Lower)',
        description: 'Diamond-shaped back muscle responsible for scapular elevation, retraction, and neck stability.',
        exercises: [
          {
            id: 'dumbbell-shrugs',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0406-NJzBsGJ.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0406-NJzBsGJ.jpg',
            name: 'Standing Dumbbell Shrugs',
            difficulty: 'Beginner',
            animationType: 'shrugs',
            muscle: 'Traps',
            secondaryMuscles: ['Forearms', 'Grip'],
            equipment: 'Dumbbells',
            setsReps: '3 sets × 15 reps',
            restSeconds: 60,
            tempo: '2-2-1-1',
            setup: [
              'Stand tall with dumbbells resting at your sides, palms facing inward.',
              'Spine neutral, gaze straight ahead.'
            ],
            execution: [
              'Elevate shoulders straight up toward your ears in a pure vertical line.',
              'Squeeze hard at the peak for a full 2-second hold.',
              'Lower shoulders down smoothly to a full stretch.'
            ],
            proTip: 'Never roll your shoulders backward or forward; rolls cause rotator cuff friction. Elevate straight up and down.',
            commonMistake: 'Using head craning forward instead of lifting with the trap fibers.'
          },
          {
            id: 'cable-face-pulls',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0187-QjB2b4k.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0187-QjB2b4k.jpg',
            name: 'Cable Face Pulls with External Rotation',
            difficulty: 'Intermediate',
            animationType: 'lateral_raise',
            muscle: 'Traps',
            secondaryMuscles: ['Rear Delts', 'Rhomboids', 'Rotator Cuff'],
            equipment: 'Cable Machine with Dual Rope',
            setsReps: '4 sets × 12-15 reps',
            restSeconds: 60,
            tempo: '2-1-1-2',
            setup: [
              'Set pulley to eye level with rope attachment.',
              'Grip rope ends with thumbs pointing backward.',
              'Step back to create tension and assume a staggered athletic stance.'
            ],
            execution: [
              'Pull the center of the rope directly toward your bridge of nose / eyes.',
              'Simultaneously rotate forearms externally so knuckles finish pointing back behind you.',
              'Squeeze rear delts and mid-traps aggressively at the contraction.'
            ],
            proTip: 'This is the #1 exercise for bulletproofing lifters against shoulder impingement and forward posture.',
            commonMistake: 'Pulling downward toward the chest instead of high to the eye line.'
          },
          {
            id: 'behind-back-barbell-shrug',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0095-dG7tG5y.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0095-dG7tG5y.jpg',
            name: 'Behind-the-Back Barbell Shrugs (Lee Haney Shrugs)',
            difficulty: 'Hard',
            animationType: 'shrugs',
            muscle: 'Traps',
            secondaryMuscles: ['Forearms', 'Rhomboids'],
            equipment: 'Smith Machine or Barbell in Rack',
            setsReps: '4 sets × 10 reps (Heavy)',
            restSeconds: 90,
            tempo: '2-1-1-2',
            setup: [
              'Stand facing away from the racked barbell with bar resting against upper glutes.',
              'Grip bar with overhand shoulder-width grip and unrack.'
            ],
            execution: [
              'Shrug shoulders up and back simultaneously.',
              'The bar slides up along your glutes and lower back, forcing upper trap and rhomboid peak tension.',
              'Hold for 2 seconds at the peak, then lower under control.'
            ],
            proTip: 'Invented by 8x Mr. Olympia Lee Haney to build unmatched upper back thickness without cervical strain.',
            commonMistake: 'Bending elbows and turning the lift into a reverse row.'
          }
        ]
      }
    ]
  },
  {
    day: 'Thursday',
    dayNumber: 4,
    title: 'Legs: Quadriceps & Hamstrings',
    focus: 'Lower Body Power, Quad Sweep & Posterior Chain Dominance',
    muscles: [
      {
        id: 'quadriceps',
        name: 'Quadriceps',
        scientificName: 'Quadriceps Femoris (Rectus Femoris, Vasteals)',
        description: 'Front thigh powerhouse responsible for knee extension, squatting power, and athletic sprint acceleration.',
        exercises: [
          {
            id: 'goblet-squat',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1760-yn8yg1r.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1760-yn8yg1r.jpg',
            name: 'Dumbbell Goblet Squats',
            difficulty: 'Beginner',
            animationType: 'squat',
            muscle: 'Quadriceps',
            secondaryMuscles: ['Glutes', 'Core', 'Hamstrings'],
            equipment: 'Single Dumbbell or Kettlebell',
            setsReps: '3 sets × 12 reps',
            restSeconds: 60,
            tempo: '3-1-1-1',
            setup: [
              'Hold a dumbbell vertically against your sternum with cupped hands.',
              'Feet slightly wider than shoulders, toes angled out 15-20 degrees.',
              'Brace core and keep elbows pointed down.'
            ],
            execution: [
              'Sit hips down and back between your knees while maintaining an upright chest.',
              'Descend until thighs are at least parallel to floor (elbows graze inside knees).',
              'Drive through mid-foot and heel to stand tall, contracting quads and glutes.'
            ],
            proTip: 'The front counterweight naturally forces your torso upright, ingraining ideal squat biomechanics.',
            commonMistake: 'Allowing knees to cave inward (valgus collapse) upon ascending.'
          },
          {
            id: 'bulgarian-split-squat',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0987-arsYEd3.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0987-arsYEd3.jpg',
            name: 'Bulgarian Split Squats',
            difficulty: 'Intermediate',
            animationType: 'bulgarian_split',
            muscle: 'Quadriceps',
            secondaryMuscles: ['Gluteus Maximus', 'Adductors', 'Calves'],
            equipment: 'Flat Bench & Pair of Dumbbells',
            setsReps: '4 sets × 10 reps per leg',
            restSeconds: 75,
            tempo: '3-1-1-1',
            setup: [
              'Stand 2 feet in front of bench. Place top of one foot rearward onto the bench surface.',
              'Hold dumbbells at sides with a proud upright chest.'
            ],
            execution: [
              'Lower your rear knee straight down toward the ground in a smooth elevator descent.',
              'Front shin stays relatively vertical; front thigh reaches parallel to the floor.',
              'Drive through front heel to return to the top.'
            ],
            proTip: 'Lean torso forward roughly 10 degrees if you want more glute focus; stay strictly vertical for pure quad isolation.',
            commonMistake: 'Front foot placed too close to bench, causing heel to lift and excessive knee strain.'
          },
          {
            id: 'barbell-back-squat',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0043-qXTaZnJ.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0043-qXTaZnJ.jpg',
            name: 'Olympic Barbell Back Squat',
            difficulty: 'Hard',
            animationType: 'squat',
            muscle: 'Quadriceps',
            secondaryMuscles: ['Glutes', 'Hamstrings', 'Erector Spinae', 'Abdominals'],
            equipment: 'Squat Rack & Olympic Barbell',
            setsReps: '5 sets × 5 reps (High Intensity)',
            restSeconds: 120,
            tempo: '3-1-1-0',
            setup: [
              'Step under bar, rest it across upper traps (high bar) or rear delts (low bar).',
              'Grip bar tightly, unrack with two steps, feet shoulder-width apart.',
              'Deep diaphragmatic breath, brace core with 360-degree intra-abdominal pressure.'
            ],
            execution: [
              'Break at hips and knees simultaneously, sinking down into a deep squat below parallel.',
              'Maintain rigid spine angle and drive knees outward in line with toes.',
              'Explode upward through mid-foot, driving your traps into the bar.'
            ],
            proTip: 'Master the valsalva maneuver: hold breath through the sticking point and exhale past 2/3 ascent.',
            commonMistake: 'Good morning squat: hips shooting up first before the chest, dumping torque into lumbar spine.'
          }
        ]
      },
      {
        id: 'hamstrings',
        name: 'Hamstrings',
        scientificName: 'Biceps Femoris, Semitendinosus & Semimembranosus',
        description: 'Posterior thigh drivers of knee flexion, hip extension, sprint deceleration, and knee joint protection.',
        exercises: [
          {
            id: 'bodyweight-glute-bridge-walkout',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1409-qKBpF7I.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1409-qKBpF7I.jpg',
            name: 'Glute Bridge Hamstring Walkouts',
            difficulty: 'Beginner',
            animationType: 'hip_thrust',
            muscle: 'Hamstrings',
            secondaryMuscles: ['Glutes', 'Lower Back', 'Core'],
            equipment: 'Exercise Mat',
            setsReps: '3 sets × 10 reps (Walkout & Back)',
            restSeconds: 60,
            tempo: 'Controlled Flow',
            setup: [
              'Lie on back with knees bent, feet flat on floor hip-width apart.',
              'Drive through heels to raise hips into a full glute bridge.'
            ],
            execution: [
              'While maintaining elevated hips, take small steps outward on your heels until legs are nearly straight.',
              'Pause for 1 second feeling maximum eccentric hamstring engagement.',
              'Take small steps back to starting bridge position without letting hips sag.'
            ],
            proTip: 'Do not allow your pelvis to drop as your feet extend out; keep glutes squeezed tight.',
            commonMistake: 'Hyperextending the lower back rather than using glute and hamstring tension.'
          },
          {
            id: 'dumbbell-rdl',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1459-rR0LJzx.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1459-rR0LJzx.jpg',
            name: 'Romanian Dumbbell Deadlifts (RDL)',
            difficulty: 'Intermediate',
            animationType: 'rdl',
            muscle: 'Hamstrings',
            secondaryMuscles: ['Glutes', 'Erector Spinae', 'Forearms'],
            equipment: 'Moderate-to-Heavy Dumbbells',
            setsReps: '4 sets × 10 reps',
            restSeconds: 75,
            tempo: '3-1-1-1',
            setup: [
              'Stand tall holding dumbbells in front of thighs with palms facing you.',
              'Feet hip-width apart, knees soft with a slight 15-degree unlock.',
              'Shoulder blades set back, lats engaged.'
            ],
            execution: [
              'Push hips straight backward toward the wall behind you as if closing a car door.',
              'Slide dumbbells tightly down along your thighs and shins until you feel an intense hamstring stretch.',
              'Drive hips forward forcefully to stand upright, squeezing glutes at the top.'
            ],
            proTip: 'The knee angle must remain constant throughout; this is a pure hip hinge, not a squat.',
            commonMistake: 'Rounding the upper or lower spine to reach the floor. Depth is dictated by hip mobility.'
          },
          {
            id: 'barbell-stiff-leg-deadlift',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1009-kuMiR2T.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1009-kuMiR2T.jpg',
            name: 'Barbell Stiff-Leg Deadlift',
            difficulty: 'Hard',
            animationType: 'deadlift',
            muscle: 'Hamstrings',
            secondaryMuscles: ['Glutes', 'Lower Back', 'Upper Back', 'Grip'],
            equipment: 'Olympic Barbell & Plates',
            setsReps: '4 sets × 6-8 reps',
            restSeconds: 90,
            tempo: '3-1-1-1',
            setup: [
              'Stand over bar with feet hip-width apart. Overhand or mixed grip outside knees.',
              'Hips set slightly higher than conventional deadlift, knees almost straight with slight flex.'
            ],
            execution: [
              'Hinge at hips, maintaining a locked neutral spine and high hip elevation.',
              'Pull bar off the floor with pure posterior chain tension, driving hamstrings and glutes.',
              'Lock out upright with vertical hips, then lower with a strict 3-second negative.'
            ],
            proTip: 'Keep bar in continuous contact with your legs to minimize moment arm and lumbar shear.',
            commonMistake: 'Allowing the bar to drift forward away from the shins.'
          }
        ]
      }
    ]
  },
  {
    day: 'Friday',
    dayNumber: 5,
    title: 'Glutes & Calves Sculpting',
    focus: 'Posterior Kinetic Drive, Ankle Resilience & Triple Extension',
    muscles: [
      {
        id: 'glutes',
        name: 'Glutes',
        scientificName: 'Gluteus Maximus, Medius & Minimus',
        description: 'Largest muscle group in the human body, vital for sprinting power, pelvic alignment, and posture.',
        exercises: [
          {
            id: 'bodyweight-glute-bridge',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1409-qKBpF7I.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1409-qKBpF7I.jpg',
            name: 'Bodyweight Glute Bridges with Squeeze',
            difficulty: 'Beginner',
            animationType: 'hip_thrust',
            muscle: 'Glutes',
            secondaryMuscles: ['Hamstrings', 'Core'],
            equipment: 'Mat',
            setsReps: '3 sets × 15 reps',
            restSeconds: 45,
            tempo: '2-2-1-2',
            setup: [
              'Lie supine on mat with knees bent at 90 degrees, feet flat on floor hip-width apart.',
              'Arms resting at sides with palms down.'
            ],
            execution: [
              'Drive through heels and push hips upward toward ceiling.',
              'Form a straight diagonal line from knees through hips to shoulders.',
              'Hold and squeeze glutes aggressively for 2 full seconds at the peak before lowering.'
            ],
            proTip: 'Place a mini resistance band just above knees to light up the gluteus medius simultaneously.',
            commonMistake: 'Overarching the lumbar spine instead of finishing with pelvic posterior tilt.'
          },
          {
            id: 'dumbbell-hip-thrust',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/3236-Pjbc0Kt.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/3236-Pjbc0Kt.jpg',
            name: 'Bench Dumbbell Hip Thrusts',
            difficulty: 'Intermediate',
            animationType: 'hip_thrust',
            muscle: 'Glutes',
            secondaryMuscles: ['Hamstrings', 'Adductors'],
            equipment: 'Bench & Heavy Dumbbell',
            setsReps: '4 sets × 12 reps',
            restSeconds: 75,
            tempo: '2-1-1-2',
            setup: [
              'Rest upper back against bench edge (just below scapulae).',
              'Place a heavy padded dumbbell across hips, securing with both hands.',
              'Feet planted firmly so shins are perpendicular to floor at the top.'
            ],
            execution: [
              'Lower hips toward floor by hinging at the hips while keeping chin tucked forward.',
              'Drive through heels, extending hips explosively until torso and thighs form a flat bridge.',
              'Squeeze glutes at peak lockout for 1-2 seconds, then lower under control.'
            ],
            proTip: 'Keep your chin tucked and eyes focused straight ahead rather than looking up at ceiling.',
            commonMistake: 'Allowing knees to cave inward during the upward drive.'
          },
          {
            id: 'barbell-deficit-thrust',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1409-qKBpF7I.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1409-qKBpF7I.jpg',
            name: 'Barbell Deficit Hip Thrusts',
            difficulty: 'Hard',
            animationType: 'hip_thrust',
            muscle: 'Glutes',
            secondaryMuscles: ['Hamstrings', 'Core'],
            equipment: 'Olympic Barbell, Foam Bar Pad, Bench & Foot Deficit',
            setsReps: '5 sets × 8 reps (Heavy Overload)',
            restSeconds: 90,
            tempo: '2-1-1-2',
            setup: [
              'Set up bench with barbell wrapped in thick foam pad across hips.',
              'Place feet elevated on a 2-4 inch step plate (deficit) for extended range of motion.',
              'Grip bar with hands on both sides.'
            ],
            execution: [
              'Descend into the extra deep deficit range for an amplified stretch under load.',
              'Drive powerfully through heels to maximum hip extension.',
              'Lock out fully and hold for 2 seconds at the peak.'
            ],
            proTip: 'The deficit increases muscular tension at the deepest position where glutes are stretched.',
            commonMistake: 'Using too much weight causing partial range of motion.'
          }
        ]
      },
      {
        id: 'calves',
        name: 'Calves',
        scientificName: 'Gastrocnemius & Soleus',
        description: 'Lower leg ankle flexors responsible for jumping power, sprinting stride, and lower limb definition.',
        exercises: [
          {
            id: 'standing-bodyweight-calf-raise',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0999-9JprnPh.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0999-9JprnPh.jpg',
            name: 'Elevated Bodyweight Calf Raises',
            difficulty: 'Beginner',
            animationType: 'calf_raise',
            muscle: 'Calves',
            secondaryMuscles: ['Tibialis Posterior', 'Foot Stabilizers'],
            equipment: 'Step or Sturdy Ledge',
            setsReps: '3 sets × 20 reps',
            restSeconds: 45,
            tempo: '2-2-1-2',
            setup: [
              'Stand with balls of feet on edge of a step, heels hanging freely in space.',
              'Lightly touch wall or rail for balance only.'
            ],
            execution: [
              'Lower heels down past the step into a deep, comfortable calf stretch for 2 seconds.',
              'Drive up onto the balls of your big toes as high as possible.',
              'Hold peak contraction for 2 seconds before descending.'
            ],
            proTip: 'Pausing at the bottom eliminates the Achilles tendon stretch reflex, forcing the muscle to do all the work.',
            commonMistake: 'Bouncing rapidly without pausing at the stretch or peak.'
          },
          {
            id: 'seated-dumbbell-calf-raise',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0088-ktsFQAZ.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0088-ktsFQAZ.jpg',
            name: 'Seated Dumbbell Calf Raises',
            difficulty: 'Intermediate',
            animationType: 'calf_raise',
            muscle: 'Calves',
            secondaryMuscles: ['Soleus Muscle'],
            equipment: 'Bench, Step Plate & Heavy Dumbbells',
            setsReps: '4 sets × 15 reps',
            restSeconds: 60,
            tempo: '2-1-1-2',
            setup: [
              'Sit on bench with balls of feet elevated on a block, knees bent at 90 degrees.',
              'Rest heavy dumbbells vertically on your lower thighs near knees (use pad for comfort).'
            ],
            execution: [
              'Lower heels into a full stretch below the block.',
              'Contract the soleus to raise your heels as high as possible.',
              'Hold for 2 seconds, then return under control.'
            ],
            proTip: 'With knees bent at 90 degrees, the gastrocnemius is slackened, directly isolating the deeper soleus muscle.',
            commonMistake: 'Letting weights bounce or roll off thighs.'
          },
          {
            id: 'standing-barbell-calf-raise',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1372-8ozhUIZ.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1372-8ozhUIZ.jpg',
            name: 'Heavy Standing Barbell Calf Raises',
            difficulty: 'Hard',
            animationType: 'calf_raise',
            muscle: 'Calves',
            secondaryMuscles: ['Gastrocnemius (Lateral & Medial Heads)', 'Core'],
            equipment: 'Olympic Barbell & Calf Block',
            setsReps: '5 sets × 10 reps (Heavy Load)',
            restSeconds: 75,
            tempo: '3-1-1-2',
            setup: [
              'Place barbell across upper traps (like a squat).',
              'Carefully step balls of feet onto calf raise block, heels off edge.',
              'Maintain tight core and straight legs with knees unlocked by 1 degree.'
            ],
            execution: [
              'Lower heels into deep calf stretch with a 3-second negative.',
              'Explosively press upward onto the balls of your feet.',
              'Flex gastrocnemius hard at the apex for 2 seconds.'
            ],
            proTip: 'Calves respond best to high mechanical tension combined with dead-stop pauses.',
            commonMistake: 'Bending the knees to bounce the weight up with quad assistance.'
          }
        ]
      }
    ]
  },
  {
    day: 'Saturday',
    dayNumber: 6,
    title: 'Abs & Lower Back Architecture',
    focus: 'Core Stabilization, Rotational Torque & Spinal Integrity',
    muscles: [
      {
        id: 'abs',
        name: 'Abs & Core',
        scientificName: 'Rectus Abdominis, Transverse Abdominis & Obliques',
        description: 'Midsection corset responsible for trunk flexion, anti-rotation, and force transfer between upper and lower body.',
        exercises: [
          {
            id: 'deadbug-crunch',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0276-iny3m5y.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0276-iny3m5y.jpg',
            name: 'Contralateral Deadbug',
            difficulty: 'Beginner',
            animationType: 'crunch',
            muscle: 'Abs & Core',
            secondaryMuscles: ['Hip Flexors', 'Transverse Abdominis'],
            equipment: 'Yoga Mat',
            setsReps: '3 sets × 12 reps per side',
            restSeconds: 45,
            tempo: '2-1-2-1',
            setup: [
              'Lie on back with arms reaching toward ceiling and knees bent at 90 degrees (tabletop).',
              'Flatten your lower back completely against the floor with zero gap.'
            ],
            execution: [
              'Slowly lower right arm back overhead while simultaneously extending left leg straight out.',
              'Hover arm and heel an inch above the floor without arching the lower back.',
              'Return smoothly and repeat with opposite arm and leg.'
            ],
            proTip: 'If your lower back arches off the mat, stop your extension short until deep core strength improves.',
            commonMistake: 'Rushing through reps and losing pelvic posterior tilt.'
          },
          {
            id: 'hanging-knee-raise',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0011-03lzqwk.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0011-03lzqwk.jpg',
            name: 'Hanging Knee-to-Chest Raises',
            difficulty: 'Intermediate',
            animationType: 'plank',
            muscle: 'Abs & Core',
            secondaryMuscles: ['Lower Abs', 'Hip Flexors', 'Forearms'],
            equipment: 'Pull-Up Bar',
            setsReps: '4 sets × 12 reps',
            restSeconds: 60,
            tempo: '2-1-1-1',
            setup: [
              'Hang from a pull-up bar with an overhand shoulder-width grip.',
              'Engage lats to steady the body and eliminate swing.'
            ],
            execution: [
              'Flex hips and curl knees smoothly upward toward your chest.',
              'At the top, tilt your pelvis upward (posterior tilt) so the lower abs contract fully.',
              'Lower legs slowly without letting body swing into momentum.'
            ],
            proTip: 'Do not just lift knees—curl your pelvis toward your sternum to activate rectus abdominis rather than just hip flexors.',
            commonMistake: 'Swinging legs forward and backward like a pendulum.'
          },
          {
            id: 'ab-wheel-rollout',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0103-xnInPfE.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0103-xnInPfE.jpg',
            name: 'Strict Ab Wheel Rollouts',
            difficulty: 'Hard',
            animationType: 'plank',
            muscle: 'Abs & Core',
            secondaryMuscles: ['Lats', 'Chest', 'Shoulders', 'Transverse Abdominis'],
            equipment: 'Ab Roller Wheel & Knee Mat',
            setsReps: '4 sets × 8-10 reps',
            restSeconds: 75,
            tempo: '3-1-1-1',
            setup: [
              'Kneel on pad holding ab wheel handles directly under shoulders.',
              'Tuck pelvis into posterior tilt, round upper back slightly (hollow body), and brace abs.'
            ],
            execution: [
              'Roll wheel forward slowly, extending body into a straight plank hovering above the floor.',
              'Hold the stretched position for 1 second under full abdominal tension.',
              'Pull through your abs and lats to return to starting position without breaking spinal alignment.'
            ],
            proTip: 'Never let your lower back sag into hyperextension. Stop as far as you can maintain a hollow core.',
            commonMistake: 'Initiating the return by sitting hips back rather than pulling with abs.'
          }
        ]
      },
      {
        id: 'lower-back',
        name: 'Lower Back',
        scientificName: 'Erector Spinae & Multifidus',
        description: 'Spinal column stabilizers providing trunk extension and structural bulletproofing against back injuries.',
        exercises: [
          {
            id: 'superman-hold',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0803-4GqRrAk.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0803-4GqRrAk.jpg',
            name: 'Prone Superman Holds',
            difficulty: 'Beginner',
            animationType: 'mobility_flow',
            muscle: 'Lower Back',
            secondaryMuscles: ['Glutes', 'Hamstrings', 'Rear Delts'],
            equipment: 'Mat',
            setsReps: '3 sets × 10 reps (3s hold)',
            restSeconds: 45,
            tempo: '1-3-1-1',
            setup: [
              'Lie face down on mat with arms extended overhead and legs straight.',
              'Neck neutral, looking down at the mat.'
            ],
            execution: [
              'Simultaneously lift arms, chest, and legs off the floor by contracting lower back and glutes.',
              'Hold the peak isometric arch for 3 full seconds.',
              'Lower smoothly back to the floor.'
            ],
            proTip: 'Reach outward through fingertips and toes rather than just arching up, elongating the spine.',
            commonMistake: 'Craning neck backward aggressively; keep cervical spine aligned.'
          },
          {
            id: 'roman-chair-hyperextension',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0489-zhMwOwE.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0489-zhMwOwE.jpg',
            name: '45° Roman Chair Hyperextensions',
            difficulty: 'Intermediate',
            animationType: 'rdl',
            muscle: 'Lower Back',
            secondaryMuscles: ['Glutes', 'Hamstrings'],
            equipment: '45-Degree Hyperextension Bench',
            setsReps: '4 sets × 12 reps',
            restSeconds: 60,
            tempo: '2-1-1-1',
            setup: [
              'Position hips on pad so upper thighs are supported, with hips free to hinge.',
              'Lock ankles under roller pads, cross arms across chest.'
            ],
            execution: [
              'Lower upper body forward by hinging at the hips until torso reaches roughly 90 degrees.',
              'Contract erector spinae, glutes, and hamstrings to raise torso back in line with legs.',
              'Stop when body forms a straight line; do not hyperextend backward.'
            ],
            proTip: 'Add a 10-25 lb plate hugged against your chest for progressive overload once bodyweight becomes easy.',
            commonMistake: 'Violently throwing the torso backward past the straight-line plane.'
          },
          {
            id: 'barbell-good-mornings',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0044-XlZ4lAC.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0044-XlZ4lAC.jpg',
            name: 'Barbell Good Mornings',
            difficulty: 'Hard',
            animationType: 'rdl',
            muscle: 'Lower Back',
            secondaryMuscles: ['Hamstrings', 'Glutes', 'Core'],
            equipment: 'Olympic Barbell & Squat Rack',
            setsReps: '4 sets × 8 reps',
            restSeconds: 90,
            tempo: '3-1-1-1',
            setup: [
              'Rack bar across upper back as in a squat.',
              'Feet shoulder-width apart, soft bend in knees.',
              'Brace abs tight to lock the lumbar spine in rigid neutral.'
            ],
            execution: [
              'Hinge at hips, sending pelvis backward while torso bows forward.',
              'Lower until torso is nearly parallel to the floor, feeling intense tension in lower back and hamstrings.',
              'Drive hips forward to return to standing position.'
            ],
            proTip: 'Start with an empty bar. This exercise demands pristine technique before adding load.',
            commonMistake: 'Rounding the spine at the bottom. The back must stay locked like a steel rod.'
          }
        ]
      }
    ]
  },
  {
    day: 'Sunday',
    dayNumber: 7,
    title: 'Functional Mobility & Active Recovery',
    focus: 'Joint Decompression, Fascial Unwinding & Deep Tissue Longevity',
    muscles: [
      {
        id: 'hip-mobility',
        name: 'Hip & Hamstring Mobility',
        scientificName: 'Psoas, Iliacus, Piriformis & Hamstrings',
        description: 'Hip capsule rotational freedom, relieving lumbar tightness and optimizing deep squat mechanics.',
        exercises: [
          {
            id: 'worlds-greatest-stretch',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1410-py1HSzx.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1410-py1HSzx.jpg',
            name: "World's Greatest Stretch & Lunge",
            difficulty: 'Beginner',
            animationType: 'mobility_flow',
            muscle: 'Hip & Hamstring Mobility',
            secondaryMuscles: ['Thoracic Spine', 'Ankles', 'Groin'],
            equipment: 'Mat',
            setsReps: '3 sets × 6 reps per side',
            restSeconds: 45,
            tempo: 'Controlled Dynamic Breathing',
            setup: [
              'Step forward into a deep runner lunge with hands planted inside front foot.',
              'Back leg extended straight with knee off ground.'
            ],
            execution: [
              'Drop inside elbow toward front instep to open the hip.',
              'Rotate chest toward front knee, reaching arm up toward the ceiling.',
              'Plant hand back down and shift hips back into a hamstring half-split stretch.'
            ],
            proTip: 'Exhale deeply into each rotation to unlock thoracic spine and hip mobility simultaneously.',
            commonMistake: 'Collapsing the back knee onto the ground during the rotational reach.'
          },
          {
            id: 'cossack-squats',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0002-Hy9D21L.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0002-Hy9D21L.jpg',
            name: 'Deep Cossack Squats',
            difficulty: 'Intermediate',
            animationType: 'squat',
            muscle: 'Hip & Hamstring Mobility',
            secondaryMuscles: ['Adductors', 'Ankles', 'Glute Medius'],
            equipment: 'Bodyweight or Light Kettlebell',
            setsReps: '3 sets × 8 reps per side',
            restSeconds: 60,
            tempo: '3-1-1-1',
            setup: [
              'Take an ultra-wide stance (about double shoulder width) with feet pointed slightly outward.',
              'Torso tall, arms held in front for balance.'
            ],
            execution: [
              'Shift weight to one side, squatting deeply on that leg while keeping the opposite leg straight.',
              'Rotate the straight leg so toes point upward toward the ceiling.',
              'Descend as low as comfortable, press through the squatting heel to switch smoothly to the other side.'
            ],
            proTip: 'Keeps knees resilient and adductors flexible, preventing groin pulls during heavy compound lifts.',
            commonMistake: 'Heel lifting off the ground on the squatting leg.'
          },
          {
            id: 'overhead-squat-hold',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0069-gfk9kD4.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0069-gfk9kD4.jpg',
            name: 'Overhead Deep Squat Mobility Holds',
            difficulty: 'Hard',
            animationType: 'squat',
            muscle: 'Hip & Hamstring Mobility',
            secondaryMuscles: ['Thoracic Spine', 'Shoulders', 'Core'],
            equipment: 'PVC Pipe or Wooden Dowel',
            setsReps: '4 sets × 45s hold',
            restSeconds: 60,
            tempo: 'Static Isometric Breathing',
            setup: [
              'Hold PVC pipe with wide snatch grip directly overhead.',
              'Lock elbows, pull shoulders back, feet shoulder-width.'
            ],
            execution: [
              'Descend into a full rock-bottom squat while keeping the PVC pipe stacked directly over mid-foot.',
              'Chest upright, knees driven out wide, heels flat.',
              'Hold the deep position for 45 seconds while taking deep diaphragmatic breaths.'
            ],
            proTip: 'The ultimate diagnostic test for full-body mobility, from ankles and hips to thoracic spine and shoulders.',
            commonMistake: 'Arms falling forward in front of the head as the hips sink.'
          }
        ]
      },
      {
        id: 'thoracic-mobility',
        name: 'Thoracic & Shoulder Mobility',
        scientificName: 'Thoracic Vertebrae, Scapulohumeral Complex',
        description: 'Upper back rotational capacity, overhead shoulder range, and posture restoration.',
        exercises: [
          {
            id: 'thread-the-needle',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1353-PsVS1QP.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1353-PsVS1QP.jpg',
            name: 'Thread the Needle Rotations',
            difficulty: 'Beginner',
            animationType: 'mobility_flow',
            muscle: 'Thoracic & Shoulder Mobility',
            secondaryMuscles: ['Posterior Delts', 'Rhomboids', 'Neck'],
            equipment: 'Mat',
            setsReps: '3 sets × 8 reps per side',
            restSeconds: 45,
            tempo: 'Smooth Dynamic Hold',
            setup: [
              'Begin on hands and knees (quadruped position) with wrists under shoulders and knees under hips.'
            ],
            execution: [
              'Slide one arm underneath your torso along the floor, lowering that shoulder and temple to the mat.',
              'Feel a deep stretch in the upper back and shoulder blade.',
              'Press through grounded hand to reverse and reach the arm upward to open the chest.'
            ],
            proTip: 'Keep your hips squared over your knees so all rotation occurs in the thoracic spine.',
            commonMistake: 'Shifting hips sideways to cheat the stretch.'
          },
          {
            id: 'wall-slides',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1407-PzNxakt.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1407-PzNxakt.jpg',
            name: 'Scapular Wall Slides with W-to-Y',
            difficulty: 'Intermediate',
            animationType: 'shoulder_press',
            muscle: 'Thoracic & Shoulder Mobility',
            secondaryMuscles: ['Lower Traps', 'Serratus Anterior', 'Rotator Cuff'],
            equipment: 'Flat Wall Surface',
            setsReps: '3 sets × 12 reps',
            restSeconds: 45,
            tempo: '2-1-2-1',
            setup: [
              'Stand with heels, glutes, upper back, and head resting flat against a wall.',
              'Raise arms into a "W" position with elbows and backs of hands pressed against the wall.'
            ],
            execution: [
              'Slide arms upward into a "Y" position overhead while keeping elbows, wrists, and fingers glued to the wall.',
              'Do not allow lower back to arch away from the wall.',
              'Slide arms slowly back down to "W" position, feeling lower traps engage.'
            ],
            proTip: 'Eliminates rounded shoulder syndrome caused by excessive bench pressing and desk work.',
            commonMistake: 'Hands or elbows peeling off the wall as arms travel upward.'
          },
          {
            id: 'bridge-rotation',
            gifUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1409-qKBpF7I.gif',
            imageUrl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1409-qKBpF7I.jpg',
            name: 'Full Bridge Rotational Reach',
            difficulty: 'Hard',
            animationType: 'mobility_flow',
            muscle: 'Thoracic & Shoulder Mobility',
            secondaryMuscles: ['Lats', 'Hip Flexors', 'Abdominals'],
            equipment: 'Mat',
            setsReps: '4 sets × 6 reps per side',
            restSeconds: 60,
            tempo: '3s Hold per Reach',
            setup: [
              'Sit on floor with knees bent and feet flat. Place hands behind you with fingers pointed away (crab position).'
            ],
            execution: [
              'Drive hips upward into a table bridge.',
              'Release one hand and reach it diagonally across your body overhead toward the floor.',
              'Hold the arch for 3 seconds, expanding chest and hip flexors before returning.'
            ],
            proTip: 'Combines glute activation with extreme thoracic extension and shoulder opening.',
            commonMistake: 'Failing to lift hips high before beginning the rotational reach.'
          }
        ]
      }
    ]
  }
];

// Flat list of all 42 exercises for quick lookup or filtering
export const ALL_EXERCISES = WORKOUT_SPLIT.flatMap((day) =>
  day.muscles.flatMap((muscle) =>
    muscle.exercises.map((exercise) => ({
      ...exercise,
      day: day.day,
      dayNumber: day.dayNumber,
      dayTitle: day.title,
      muscleGroupId: muscle.id,
      muscleGroupName: muscle.name,
    }))
  )
);
