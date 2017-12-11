const config = require('./.config');
const onfleet = require('onfleet')(config.onfleet);
const asyncLoop = require('node-async-loop');

const getDCBikeBatch = async () => {
  try{
    const { tasks } = await onfleet.workers.retrieve('jCiurZFM5jJ2MMsg6CXG8F5q');
    return tasks
  } catch (err){
    console.log(err)
  }

}

//currently set to move all jobs to december 9th, between 9am and 9pm
getDCBikeBatch()
.then(tasks => {
  asyncLoop(tasks, async (task, next) => {
    try {
      console.log(`moving ${task}...`);
      const newCompleteAfter = new Date(2017, 11, 7, 9).getTime();
      const newCompleteBefore = new Date(2017, 11, 7, 21).getTime();
      await onfleet.tasks.update(task, {
        "completeBefore": newCompleteBefore,
        "completeAfter": newCompleteAfter
      });
    } catch (err){
      console.log(err);
    }
    setTimeout(()=>{
      next();
    },50);

  });
})
.catch(console.log)
