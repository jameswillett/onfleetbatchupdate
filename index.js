const config = require('./.config');
const onfleet = require('onfleet')(config.onfleet);

const getDCBikeBatch = async () => {
  try{
    const { tasks } = await onfleet.workers.retrieve('jCiurZFM5jJ2MMsg6CXG8F5q');
    return tasks
  } catch (err){
    console.log(err)
  }
}

const moveDCBikeBatch = async (tasks, i = 0) => {
  if (!tasks.length) return console.log("no tasks :(")
  try {
    console.log(`moving ${tasks[i]}...`);
    const newCompleteAfter = new Date(2017, 11, 12, 9).getTime();
    const newCompleteBefore = new Date(2017, 11, 12, 21).getTime();
    await onfleet.tasks.update(tasks[i], {
      "completeBefore": newCompleteBefore,
      "completeAfter": newCompleteAfter
    });
    if (i < tasks.length - 1){
      setTimeout( async () => {
        await moveDCBikeBatch(tasks, i + 1)
      }, 50)
    } else {
      return console.log("done! :)")
    }
  } catch (err){
    console.log(err);
  }
}

const main = () => {
  getDCBikeBatch()
    .then(moveDCBikeBatch)
    .catch(console.log)
}

main()
