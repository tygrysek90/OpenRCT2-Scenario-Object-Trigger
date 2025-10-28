# OpenRCT2-Scenario-Object-Trigger

#### Original idea by Xedoh
#### OpenRCT2 plugin for some custom scenario action
Currently there is only one action possible: purify water when given object count is zero.
**How does it work?**
Plugin operates in two modes: Scenario editor or game. In scenario editor, it possible to define objective action and have it saved. In game mode, plugin watches and performs given action on condition given before.

### Scenario editor part
<img width="30" height="27" alt="image" src="https://github.com/user-attachments/assets/dfd1904e-f820-4f39-9058-ea6fc831e2d8" /> From map icon menu  select **"Scenario Object Trigger"**

<img width="527" height="149" alt="image" src="https://github.com/user-attachments/assets/825e16e7-4e17-404a-bae2-b1ba987f5a5a" />

In window presented choose a "trash" object to fill in action. If you want, [there is object for testing](https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger/raw/refs/heads/main/test_resources/tygrysek90.scenery_small.tmj.parkobj), it costs 400 moneys to remove.

Note: You must set water to green or other not normal colour in order for action to be done in the game, otherwise it has no common sense.

### Game part
The script watches and counts removal of "trash" objects. Once all are removed, a specified action will be done (so far there is only one -> purify water = sets water colour back to normal)

### Download
[At releases page](https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger/releases). Currently its development versions only (they write a lot of debug stuff into console)

### Screenshots, testing park
You can get the [testing park here](https://github.com/tygrysek90/OpenRCT2-Scenario-Object-Trigger/raw/refs/heads/main/test_resources/Trash%20Lagoon%20Test.park)

Starting into this: a park polluted with some crap and nasty water
<img width="843" height="614" alt="Snímek obrazovky z 2025-10-28 09-38-07" src="https://github.com/user-attachments/assets/e7b55aa1-245e-429f-bb3b-233395979cc6" />

And after years of builing, earning, and extremly costy removing of trash
<img width="843" height="614" alt="image" src="https://github.com/user-attachments/assets/fdf8ba76-b39d-4255-baa3-dc9b4cd8b2c0" />
