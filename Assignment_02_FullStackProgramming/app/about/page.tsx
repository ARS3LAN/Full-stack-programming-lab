import React from 'react';

export default function AboutPage() {
  const teamMembers = Array(4).fill({
    name: "Jennifer lawrence",
    title: "Business Consultant",
    desc: "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor."
  });

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; <span className="text-gray-600">About Us</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">About Us</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        {/* Welcome Section */}
        <h3 className="text-lg font-bold mb-4 border-b border-gray-300 pb-2 text-slate-800">
          Welcome to the Company
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="text-xs leading-relaxed text-gray-700 flex-1 space-y-4">
            <p>
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.
            </p>
            <p>
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.
            </p>
          </div>
          <div className="w-full md:w-1/3 h-48 bg-gray-300 flex items-center justify-center text-gray-500 border border-gray-400">
            [Showroom Image]
          </div>
        </div>

        {/* Team Section */}
        <h3 className="text-lg font-bold mb-4 border-b border-gray-300 pb-2 text-slate-800">
          Our Company members
        </h3>
        <p className="text-xs text-gray-700 mb-6">
          This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-full h-40 bg-white mb-4 border border-gray-200 flex items-center justify-center text-gray-400">
                [Member Photo]
              </div>
              <h4 className="font-bold text-sm text-slate-800">{member.name}</h4>
              <p className="text-[11px] text-gray-600 mb-2">{member.title}</p>
              <p className="text-[10px] text-gray-400 leading-tight">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Brand Banner */}
      <div className="border border-gray-200 p-4 flex flex-wrap justify-between items-center mb-10 gap-4">
        <div className="text-blue-500 font-bold text-xl italic">SAVE $1,000'S</div>
        <div className="text-blue-700 text-2xl font-serif">OCEANICSpa</div>
        <div className="text-orange-500 text-xl font-serif">CalderaSpas</div>
        <div className="text-green-700 text-xl font-serif">IslandSpas</div>
      </div>
    </div>
  );
}