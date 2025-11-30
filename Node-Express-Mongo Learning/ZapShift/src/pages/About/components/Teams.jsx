import React from 'react';

const Teams = () => {
    const teams = [
        {
            name: 'Mr. Ali',
            image: 'https://imgs.search.brave.com/_q92eAIg5TpY3VmZC2jWhqL-cfQwvk8eN3_vuNemJJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdhLzhm/LzllLzdhOGY5ZTNk/YjY0YjJlYWQ0NjA0/ZmZiOGUxNzc0NmJl/LmpwZw',
            postion: 'CEO'
        },
        {
            name: 'Mr. Sheikh',
            image: 'https://imgs.search.brave.com/P6GPkTWVsmHaapgG254gvqCQLi7MKbRoQ-OIujgSRPQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjE1MTU0/NDk3MTEtYWNlNDU5/MDU0Zjc4P2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZpeGxpYj1yYi00/LjEuMCZpeGlkPU0z/d3hNakEzZkRCOE1I/eHpaV0Z5WTJoOE1U/ZDhmRzltWm1salpT/VXlNRzFsYm54bGJu/d3dmSHd3Zkh4OE1B/PT0',
            postion: "CTO"
        },
        {
            name: 'Jalal Yunus',
            image: 'https://img.daisyui.com/images/stock/daisyui-hat-1.webp',
            postion: "CSR"
        },
        {
            name: 'Pablo Hernandz',
            image: 'https://imgs.search.brave.com/bj0oxNkQ1VtnekOfzE9wF0sQZCtBWOXfIlbohm4RPYQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYWxlLWFjY291/bnRhbnQtb2ZmaWNl/LXBvcnRyYWl0LXdp/dGgtZ2xhc3Nlcy1j/b25maWRlbmNlLXNt/aWxlLXByb3VkLXdv/cmtwbGFjZS1idXNp/bmVzc21hbi1zdWNj/ZXNzLWNvbWZvcnQt/ZmluYW5jZS1jb21w/YW55LW1hbmFnZW1l/bnQtcHJvZmVzc2lv/bmFsLWluZHVzdHJ5/XzU5MDQ2NC0zOTU4/OTUuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MCZxPTgw',
            position: 'INVESTOR'
        }
    ]
    return (
        <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-5'>
            {
                teams.map((team, i) =>
                    <div key={i} className="card card-sm bg-base-200 max-w-60 shadow">
                        <figure>
                            <img className='h-[200px] md:h-[250px] object-cover w-full' src={team?.image} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title flex justify-between">
                                {team?.name}
                            </h2>
                            <p className='font-medium'>{team.postion}, ZapShift</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Teams;