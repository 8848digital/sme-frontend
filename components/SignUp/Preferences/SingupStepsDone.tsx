import Logo from '@/components/Logo';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/wizard.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import StartBioBuildingModal from './StartBioBuildingModal';
import { useState } from 'react';

const SingupStepsDone = () => {
  const [showStartBioModal, setShowShowStartBioModal] = useState(false);
  const translationDataFromStore = useSelector(translation_text_from_Store)

const router = useRouter();
  return (
    <div className="container">
      <div >
        <div className="row">
          <div className="col-12">
            <div className={`${styles.common_wizard_wrapper}`}>

              <div>
                <Logo />
              </div>
              <div className="mt-5">
                <h1 style={{fontSize:'24px'}}>{translationDataFromStore?.data?.done}!</h1>
                <p className='grey'>{translationDataFromStore?.data?.signup_complete_description}</p>
              </div>
              <div className={`${styles.common_wizard_btn}`}>
                <div className={styles.button_wrapper}>

                  <div className="mb-3 ">

                    <button
                      className={`btn ${styles.next_button}`}
                      onClick={() => setShowShowStartBioModal(true)}
                    >
                      {translationDataFromStore?.data?.confirm}

                    </button>

                  </div>
                  <div>

                    <button
                      className={`btn ${styles.later_button }`}
                       onClick={()=>{
                        router.push('/')
                       }}
                    >
                      {translationDataFromStore?.data?.later}
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StartBioBuildingModal 
       show={showStartBioModal}
       onHide={() => setShowShowStartBioModal(false)}
      />
    </div>
  );
}

export default SingupStepsDone;
