import React from 'react'

interface Provider {
  times: Array<string>;
  setTimes:any
}


export function Appointment() {
  const [times, setTimes] = React.useState<Provider[]>([]);
  React.useEffect(()=>{
    let date = new Date()
    date.setDate(date.getDate()+1)
    date.setHours(9)
    date.setMinutes(0)
    date.setSeconds(0)
    let dates = new Array(100);
    dates[0] = date;
    dates = dates.map((el, i)=>{
      if (+el.getHours()*+el.getMinutes()<510){
        dates[i+1] = new Date(el.getTime() + 1800000)
      } else{
        let date = new Date()
        date.setDate(el.getDate()+1)
        date.setHours(8)
        date.setMinutes(30)
        date.setSeconds(0)
        dates[i+1] = new Date(date.getTime() + 1800000)
      }
      el = el.toLocaleString('ru')
      return el = el.substring(0, el.length - 3)
      
    })
    setTimes(dates)
  }, [])
  async function handleAppointment(e:any){
    e.preventDefault()
    const req = await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: e.target.name.value,
        doctor: e.target.doctor.value,
        time: e.target.time.value,
        issues: e.target.issues.value,
      })
    })
    const res = await req.json()
    alert(res)
    if (res==='Успешная запись'){
      document.location.href='/'
    } 
  }
  return (
      <form onSubmit={(e)=>handleAppointment(e)} className='h-72 flex justify-around flex-col mx-auto'>
      <input className='border-2 h-10 rounded-sm p-2' name='name' type='text' placeholder='ФИО пациента' required/>
      <select name='doctor' className='bg-green-100 p-2 h-10'>
        <option value="Школвский Борис Елизарович">Школвский Борис Елизарович</option>
        <option value="Воронова Тамара Ильевна">Воронова Тамара Ильевна</option>
        <option value="Барсова Лилия Олеговна">Барсова Лилия Олеговна</option>
        <option value="Крючков Валерий Филиппович">Крючков Валерий Филиппович</option>
      </select>
      <select name='time' className='bg-green-100 p-2 h-10'>
        {times.map((time, i)=>(
            <option key={i}>{time}</option>
        ))}
      </select>
      <textarea name='issues' placeholder='Что вас беспокоит?' className='border-2 h-20 rounded-sm p-2' />
      <button className='bg-green-200 h-10 rounded-full w-40 mt-2 mx-auto focus:ring-2 focus:outline-none focus:ring-green-600'>Записаться</button>
    </form>
  )
}

