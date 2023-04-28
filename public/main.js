let junk =document.querySelector('#noInput')
let car = 'cars'
let model = 'model'
let trashy = document.getElementsByClassName('trash')

Array.from(trashy).forEach(function(element) {
    element.addEventListener('click', function(){
      const car = this.parentNode.childNodes[1].innerText
      const model = this.parentNode.childNodes[3].innerText
      console.log('hello',car, model)
      fetch('/models', {
      
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'cars': car,
          'model': model
        })

      }).then(function (response) {
        window.location.reload()
      })
    });
});





// trashy.addEventListener('click', deleteWords => {
//     fetch('/models', {
//         method: 'delete', 
//         headers : {'Content-Type': 'application/json'}, 
//         body: JSON.stringify({
//             car: 'cars',
//             model: 'model'
//         })
//     })
//     .then(response => {
//         if(response === 'there is no car to send to the junkyard!'){
//             junk.textContent = 'NOTHING IN HERE!!!'

//         }
//         else{
//             window.location.reload(true)
//         }
//     })
//     .then(data => {
//         window.location.reload()
//     })
// })
