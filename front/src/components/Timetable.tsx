import React from 'react'

interface Provider {
  dates: Array<string>;
  setDates:any;
  appointments: Array<object>;
  setAppoinments:any
}


export function Timetable() {
  const [dates, setDates] = React.useState<Provider[]>([]);
  const [appointments, setAppoinments] = React.useState<Provider[]>([]);
  React.useEffect(()=>{
    let date = new Date()
    date.setDate(date.getDate()+1)
    let dates = new Array(10);
    dates[0] = date;
    dates = dates.map((el, i)=>{
      dates[i+1] = new Date()
      dates[i+1].setDate(el.getDate()+1)
      return el = el.toLocaleDateString('ru')
    })
    setDates(dates)
  }, [])

  async function getTimetable(){
   const req = await fetch('http://localhost:3001/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        doctor: document.forms[0].doctor.value,
        date: document.forms[0].date.value,
      })
    })
    const res = await req.json()
    setAppoinments(res)
  }
  async function deleteAppointment (data:any) {
    const req = await fetch('http://localhost:3001/appointments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        doctor: data.doctor,
        time: data.time,
      })
    })
    const res = await req.json()
    setAppoinments(res)
  }
  return (
    <div className='flex justify-start flex-col mx-auto'>
      <h2 className='text-2xl text-center'>Расписание врача</h2>
      <form className='h-36 flex justify-around flex-col w-9/12 mx-auto'>
      <select onChange={()=>getTimetable()} name='doctor' className='bg-green-100 p-2 h-10'>
      <option value="">Выберите доктора</option>
        <option value="Школвский Борис Елизарович">Школвский Борис Елизарович</option>
        <option value="Воронова Тамара Ильевна">Воронова Тамара Ильевна</option>
        <option value="Барсова Лилия Олеговна">Барсова Лилия Олеговна</option>
        <option value="Крючков Валерий Филиппович">Крючков Валерий Филиппович</option>
      </select>
      <select onChange={()=>getTimetable()} name='date' className='bg-green-100 p-2 h-10'>
        {dates.map((time, i)=>(
            <option key={i}>{time}</option>
        ))}
      </select>
    </form>
    <div className='h-72 w-9/12 shadow-lg mx-auto p-2 my-2 overflow-auto'>
      {appointments.length ? appointments.map((el, i)=>{
        let data : any = el
        return(
        <section key={i} className='shadow-md text-sm'>
          <p>Пациент: {data.name}</p>
          <p>Время: {data.time}</p>
          <p>Жалобы: {data.issues?data.issues:'Нет'}</p>
          <button className='bg-green-200 p-1' onClick={()=>deleteAppointment(data)}>Удалить запись</button>
        </section>
      )}) : 'Записей нет'}
    </div>
    </div>
  )
}

